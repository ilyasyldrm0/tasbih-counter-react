import React from 'react';
import { Modal, View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DhikrItem } from '../store/useDhikrStore';
import { DhikrCard } from './DhikrCard';

interface DhikrPickerModalProps {
    visible: boolean;
    onClose: () => void;
    dhikrs: DhikrItem[];
    onSelect: (id: string) => void;
    onAdd: () => void;
    onEdit: (item: DhikrItem) => void;
    onDelete: (id: string) => void;
    activeId?: string | null;
}

export const DhikrPickerModal: React.FC<DhikrPickerModalProps> = ({
    visible, onClose, dhikrs, onSelect, onAdd, onEdit, onDelete, activeId
}) => {
    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Zikirlerim</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <Ionicons name="close" size={28} color="#333" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={dhikrs}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <DhikrCard
                            item={item}
                            isActive={item.id === activeId}
                            onPress={() => { onSelect(item.id); onClose(); }}
                            onEdit={() => onEdit(item)}
                            onDelete={() => onDelete(item.id)}
                        />
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="list" size={48} color="#ddd" />
                            <Text style={styles.empty}>Listeniz boş. Yeni ekleyerek başlayın.</Text>
                        </View>
                    }
                />

                <TouchableOpacity style={styles.fab} onPress={onAdd}>
                    <Ionicons name="add" size={32} color="white" />
                    <Text style={styles.fabText}>Yeni Zikir</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333'
    },
    closeBtn: {
        padding: 4
    },
    listContent: {
        padding: 16,
        paddingBottom: 100
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        gap: 10
    },
    empty: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#3498db',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    fabText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 16
    }
});
