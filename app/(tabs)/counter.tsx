import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useKeepAwake } from 'expo-keep-awake';
import { Ionicons } from '@expo/vector-icons';
import { useDhikrStore, DhikrItem } from '../../src/store/useDhikrStore';
import { CounterButton } from '../../src/components/CounterButton';
import { DhikrPickerModal } from '../../src/components/DhikrPickerModal';
import { DhikrFormModal } from '../../src/components/DhikrFormModal';

export default function CounterScreen() {
    useKeepAwake();
    const { dhikrs, activeSession, setActiveDhikr, increment, undo, resetSession, createDhikr, updateDhikr, deleteDhikr } = useDhikrStore();

    const activeDhikr = dhikrs.find(d => d.id === activeSession.dhikrId);

    const [pickerVisible, setPickerVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [editingDhikr, setEditingDhikr] = useState<DhikrItem | null>(null);

    const handleIncrement = () => {
        if (!activeDhikr) {
            Alert.alert("Zikir Seçilmedi", "Lütfen başlamak için bir zikir seçin.", [
                { text: "Listeyi Aç", onPress: () => setPickerVisible(true) },
                { text: "İptal", style: "cancel" }
            ]);
            return;
        }
        increment();
    };

    const handleCreateOrUpdate = (data: { name: string; text: string; target?: number }) => {
        if (editingDhikr) {
            updateDhikr(editingDhikr.id, data);
        } else {
            createDhikr(data);
        }
        setEditingDhikr(null);
    };

    const openEdit = (item: DhikrItem) => {
        setEditingDhikr(item);
        setFormVisible(true);
    };

    const handleDelete = (id: string) => {
        Alert.alert("Sil", "Bu zikri silmek istediğinize emin misiniz?", [
            { text: "İptal", style: "cancel" },
            { text: "Sil", style: "destructive", onPress: () => deleteDhikr(id) }
        ]);
    };

    // Status color
    const progress = activeDhikr?.target ? (activeDhikr.totalCount / activeDhikr.target) : 0;
    const isCompleted = activeDhikr?.target && activeDhikr.totalCount >= activeDhikr.target;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setPickerVisible(true)} style={styles.menuBtn}>
                    <Ionicons name="menu" size={28} color="#333" />
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <Text style={styles.headerTitle} numberOfLines={1}>
                        {activeDhikr ? activeDhikr.name : "Bir Zikir Seçin"}
                    </Text>
                    {activeDhikr && (
                        <Text style={styles.headerSubtitle}>
                            Bugün (Oturum): {activeSession.count}
                        </Text>
                    )}
                </View>
                <TouchableOpacity onPress={() => { setEditingDhikr(null); setFormVisible(true); }} style={styles.addBtn}>
                    <Ionicons name="add" size={28} color="#333" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <CounterButton
                    onPress={handleIncrement}
                    count={activeDhikr ? activeDhikr.totalCount : 0}
                    target={activeDhikr?.target}
                />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={undo}
                    disabled={!activeDhikr || activeSession.count === 0}
                >
                    <Ionicons name="arrow-undo" size={24} color={(!activeDhikr || activeSession.count === 0) ? "#ccc" : "#333"} />
                    <Text style={[styles.footerBtnText, (!activeDhikr || activeSession.count === 0) && { color: "#ccc" }]}>Geri Al</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => {
                        Alert.alert("Sıfırla", "Oturum sayacını sıfırlamak istiyor musunuz? Toplam zikir etkilenmez.", [
                            { text: "İptal", style: "cancel" },
                            { text: "Sıfırla", onPress: resetSession }
                        ]);
                    }}
                    disabled={!activeDhikr || activeSession.count === 0}
                >
                    <Ionicons name="refresh" size={24} color={(!activeDhikr || activeSession.count === 0) ? "#ccc" : "#333"} />
                    <Text style={[styles.footerBtnText, (!activeDhikr || activeSession.count === 0) && { color: "#ccc" }]}>Sıfırla</Text>
                </TouchableOpacity>
            </View>

            <DhikrPickerModal
                visible={pickerVisible}
                onClose={() => setPickerVisible(false)}
                dhikrs={dhikrs}
                onSelect={setActiveDhikr}
                activeId={activeSession.dhikrId}
                onAdd={() => { setPickerVisible(false); setEditingDhikr(null); setFormVisible(true); }}
                onEdit={(item) => { setPickerVisible(false); openEdit(item); }}
                onDelete={handleDelete}
            />

            <DhikrFormModal
                visible={formVisible}
                onClose={() => { setFormVisible(false); setEditingDhikr(null); }}
                onSubmit={handleCreateOrUpdate}
                initialData={editingDhikr}
                title={editingDhikr ? "Zikir Düzenle" : "Yeni Zikir Ekle"}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    headerInfo: {
        flex: 1,
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#666',
        marginTop: 2
    },
    menuBtn: {
        padding: 8
    },
    addBtn: {
        padding: 8
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0'
    },
    footerBtn: {
        alignItems: 'center',
        gap: 4
    },
    footerBtnText: {
        fontSize: 12,
        color: '#333',
        fontWeight: '500'
    }
});
