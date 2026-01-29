import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DhikrItem } from '../store/useDhikrStore';

interface DhikrCardProps {
    item: DhikrItem;
    onPress: () => void;
    onEdit: () => void;
    onDelete: () => void;
    isActive?: boolean;
}

export const DhikrCard: React.FC<DhikrCardProps> = ({ item, onPress, onEdit, onDelete, isActive }) => {
    return (
        <TouchableOpacity
            style={[styles.card, isActive && styles.activeCard]}
            onPress={onPress}
            activeOpacity={0.6}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    {isActive && <View style={styles.badge}><Text style={styles.badgeText}>AKTİF</Text></View>}
                </View>
                <Text style={styles.text} numberOfLines={2}>{item.text}</Text>
                <View style={styles.footer}>
                    <Text style={styles.stats}>Toplam: {item.totalCount}</Text>
                    {item.target && <Text style={styles.target}> / {item.target}</Text>}
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={(e) => { e.stopPropagation(); onEdit(); }} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={22} color="#3498db" />
                </TouchableOpacity>
                <TouchableOpacity onPress={(e) => { e.stopPropagation(); onDelete(); }} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={22} color="#e74c3c" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#eee'
    },
    activeCard: {
        borderColor: '#3498db',
        backgroundColor: '#f0f9ff'
    },
    content: {
        flex: 1,
        paddingRight: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        flexShrink: 1
    },
    badge: {
        backgroundColor: '#3498db',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 8
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontStyle: 'italic'
    },
    footer: {
        flexDirection: 'row'
    },
    stats: {
        fontSize: 14,
        fontWeight: '500',
        color: '#444'
    },
    target: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        gap: 8
    },
    iconBtn: {
        padding: 8
    }
});
