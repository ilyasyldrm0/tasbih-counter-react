import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDhikrStore, DhikrItem } from '../../src/store/useDhikrStore';
import { DhikrCard } from '../../src/components/DhikrCard';
import { DhikrFormModal } from '../../src/components/DhikrFormModal';
import i18n from '../../src/i18n';

export default function MyDhikrsScreen() {
    const router = useRouter();
    const { dhikrs, activeSession, setActiveDhikr, deleteDhikr, updateDhikr } = useDhikrStore();

    const [formVisible, setFormVisible] = useState(false);
    const [editingDhikr, setEditingDhikr] = useState<DhikrItem | null>(null);

    const handleSelect = (id: string) => {
        setActiveDhikr(id);
        router.push('/(tabs)/counter');
    };

    const handleUpdate = (data: { name: string; text: string; target?: number }) => {
        if (editingDhikr) {
            updateDhikr(editingDhikr.id, data);
            setEditingDhikr(null);
        }
    };

    const handleDelete = (id: string) => {
        Alert.alert(i18n.t('alert_title_delete'), i18n.t('alert_msg_delete'), [
            { text: i18n.t('btn_cancel'), style: "cancel" },
            { text: i18n.t('btn_delete'), style: "destructive", onPress: () => deleteDhikr(id) }
        ]);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={dhikrs}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <DhikrCard
                        item={item}
                        isActive={item.id === activeSession.dhikrId}
                        onPress={() => handleSelect(item.id)}
                        onEdit={() => { setEditingDhikr(item); setFormVisible(true); }}
                        onDelete={() => handleDelete(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="list" size={64} color="#ddd" />
                        <Text style={styles.emptyText}>{i18n.t('empty_list')}</Text>
                        <Text style={styles.emptySubText}>{i18n.t('empty_subtext')}</Text>
                    </View>
                }
            />

            <DhikrFormModal
                visible={formVisible}
                onClose={() => { setFormVisible(false); setEditingDhikr(null); }}
                onSubmit={handleUpdate}
                initialData={editingDhikr}
                title={editingDhikr ? i18n.t('edit_dhikr_title') : i18n.t('new_dhikr_title')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    list: {
        padding: 16
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        paddingHorizontal: 20
    },
    emptyText: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#888'
    },
    emptySubText: {
        marginTop: 8,
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center'
    }
});
