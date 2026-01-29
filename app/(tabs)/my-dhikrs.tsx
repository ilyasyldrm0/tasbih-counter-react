import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDhikrStore, DhikrItem } from '../../src/store/useDhikrStore';
import { DhikrCard } from '../../src/components/DhikrCard';
import { DhikrFormModal } from '../../src/components/DhikrFormModal';

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
        Alert.alert("Sil", "Bu zikri silmek istediğinize emin misiniz?", [
            { text: "İptal", style: "cancel" },
            { text: "Sil", style: "destructive", onPress: () => deleteDhikr(id) }
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
                        <Text style={styles.emptyText}>Henüz kayıtlı zikir yok.</Text>
                        <Text style={styles.emptySubText}>Tavsiyelerden ekleyebilir veya Zikirmatik ekranından yeni oluşturabilirsiniz.</Text>
                    </View>
                }
            />

            <DhikrFormModal
                visible={formVisible}
                onClose={() => { setFormVisible(false); setEditingDhikr(null); }}
                onSubmit={handleUpdate}
                initialData={editingDhikr}
                title="Zikir Düzenle"
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
