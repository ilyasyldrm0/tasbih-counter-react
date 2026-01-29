import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { Recommendation } from '../data/recommendations';

export interface DhikrItem {
    id: string;
    name: string;
    text: string;
    reason?: string;
    target?: number | null;
    totalCount: number;
    createdAt: number;
    updatedAt: number;
}

interface ActiveSession {
    dhikrId: string | null;
    count: number;
    startedAt: number | null;
}

interface Settings {
    hapticsEnabled: boolean;
    keepAwakeEnabled: boolean;
}

interface DhikrState {
    dhikrs: DhikrItem[];
    activeSession: ActiveSession;
    settings: Settings;

    setActiveDhikr: (id: string) => void;
    increment: () => void;
    undo: () => void;
    resetSession: () => void;

    createDhikr: (data: { name: string; text: string; target?: number; reason?: string }) => void;
    updateDhikr: (id: string, patch: Partial<Omit<DhikrItem, 'id' | 'createdAt' | 'totalCount'>>) => void;
    deleteDhikr: (id: string) => void;

    startFromRecommendation: (reco: Recommendation) => void;

    toggleHaptics: () => void;
    toggleKeepAwake: () => void;
}

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2, 9);

export const useDhikrStore = create<DhikrState>()(
    persist(
        (set, get) => ({
            dhikrs: [],
            activeSession: {
                dhikrId: null,
                count: 0,
                startedAt: null,
            },
            settings: {
                hapticsEnabled: true,
                keepAwakeEnabled: true,
            },

            setActiveDhikr: (id) => {
                set((state) => ({
                    activeSession: {
                        dhikrId: id,
                        count: 0, // Reset session count on switch
                        startedAt: Date.now(),
                    },
                }));
            },

            increment: () => {
                const { activeSession, dhikrs, settings } = get();
                if (!activeSession.dhikrId) return;

                if (settings.hapticsEnabled) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }

                set((state) => {
                    const newDhikrs = state.dhikrs.map(d =>
                        d.id === state.activeSession.dhikrId
                            ? { ...d, totalCount: d.totalCount + 1, updatedAt: Date.now() }
                            : d
                    );

                    return {
                        dhikrs: newDhikrs,
                        activeSession: {
                            ...state.activeSession,
                            count: state.activeSession.count + 1,
                        }
                    };
                });
            },

            undo: () => {
                const { activeSession } = get();
                if (!activeSession.dhikrId || activeSession.count <= 0) return;

                set((state) => {
                    const newDhikrs = state.dhikrs.map(d =>
                        d.id === state.activeSession.dhikrId
                            ? { ...d, totalCount: Math.max(0, d.totalCount - 1), updatedAt: Date.now() }
                            : d
                    );
                    return {
                        dhikrs: newDhikrs,
                        activeSession: {
                            ...state.activeSession,
                            count: Math.max(0, state.activeSession.count - 1),
                        }
                    };
                });
            },

            resetSession: () => {
                set(state => ({
                    activeSession: {
                        ...state.activeSession,
                        count: 0,
                        startedAt: Date.now()
                    }
                }));
            },

            createDhikr: (data) => {
                const newDhikr: DhikrItem = {
                    id: generateId(),
                    ...data,
                    totalCount: 0,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    target: data.target || null
                };
                set(state => ({
                    dhikrs: [newDhikr, ...state.dhikrs],
                    activeSession: {
                        dhikrId: newDhikr.id,
                        count: 0,
                        startedAt: Date.now()
                    }
                }));
            },

            updateDhikr: (id, patch) => {
                set(state => ({
                    dhikrs: state.dhikrs.map(d => d.id === id ? { ...d, ...patch, updatedAt: Date.now() } : d)
                }));
            },

            deleteDhikr: (id) => {
                set(state => {
                    const newDhikrs = state.dhikrs.filter(d => d.id !== id);
                    let newSession = state.activeSession;
                    if (state.activeSession.dhikrId === id) {
                        newSession = { dhikrId: null, count: 0, startedAt: null };
                    }
                    return { dhikrs: newDhikrs, activeSession: newSession };
                });
            },

            startFromRecommendation: (reco) => {
                const { dhikrs } = get();
                const existing = dhikrs.find(d => d.text === reco.text);

                if (existing) {
                    get().setActiveDhikr(existing.id);
                } else {
                    get().createDhikr({
                        name: reco.text,
                        text: reco.text,
                        reason: reco.reason,
                        target: reco.target
                    });
                }
            },

            toggleHaptics: () => set(state => ({ settings: { ...state.settings, hapticsEnabled: !state.settings.hapticsEnabled } })),
            toggleKeepAwake: () => set(state => ({ settings: { ...state.settings, keepAwakeEnabled: !state.settings.keepAwakeEnabled } })),

        }),
        {
            name: 'dhikr_app_v1',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
