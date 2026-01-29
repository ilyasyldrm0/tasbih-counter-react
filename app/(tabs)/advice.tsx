import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { RECOMMENDATIONS, Recommendation } from '../../src/data/recommendations';
import { useDhikrStore } from '../../src/store/useDhikrStore';

export default function AdviceScreen() {
    const router = useRouter();
    const { startFromRecommendation, createDhikr, dhikrs } = useDhikrStore();

    const handleStart = (item: Recommendation) => {
        startFromRecommendation(item);
        router.push('/(tabs)/counter');
    };

    const handleSave = (item: Recommendation) => {
        const exists = dhikrs.some(d => d.text === item.text);
        if (exists) {
            Alert.alert("Bilgi", "Bu zikir zaten listenizde mevcut.");
            return;
        }
        createDhikr({
            name: item.text,
            text: item.text,
            reason: item.reason,
            target: item.target
        });
        Alert.alert("Başarılı", "Zikir listenize eklendi.");
    };

    const renderItem = ({ item }: { item: Recommendation }) => (
        <View style={styles.card}>
            <View style={styles.content}>
                <Text style={styles.text}>{item.text}</Text>
                <Text style={styles.reason}>{item.reason}</Text>
                {item.target && <Text style={styles.target}>Tavsiye Edilen Hedef: {item.target}</Text>}
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={[styles.btn, styles.saveBtn]} onPress={() => handleSave(item)}>
                    <Text style={styles.btnTextSave}>Kaydet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.startBtn]} onPress={() => handleStart(item)}>
                    <Text style={styles.btnTextStart}>Başla</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={RECOMMENDATIONS}
                keyExtractor={item => item.text}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ListHeaderComponent={<Text style={styles.headerTitle}>Günlük Zikir Tavsiyeleri</Text>}
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
        padding: 16,
        paddingBottom: 40
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        paddingLeft: 4
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    content: {
        marginBottom: 12
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 6
    },
    reason: {
        fontSize: 14,
        color: '#7f8c8d',
        fontStyle: 'italic',
        lineHeight: 20,
        marginBottom: 6
    },
    target: {
        fontSize: 12,
        color: '#3498db',
        fontWeight: '600'
    },
    actions: {
        flexDirection: 'row',
        gap: 12
    },
    btn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveBtn: {
        backgroundColor: '#ecf0f1'
    },
    startBtn: {
        backgroundColor: '#3498db'
    },
    btnTextSave: {
        color: '#34495e',
        fontWeight: '600'
    },
    btnTextStart: {
        color: '#fff',
        fontWeight: '600'
    }
});
