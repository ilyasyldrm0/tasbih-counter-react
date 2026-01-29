import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                friction: 6
            })
        ]).start();

        const timer = setTimeout(() => {
            // Navigate to tabs
            router.replace('/(tabs)/counter');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                <Ionicons name="finger-print" size={80} color="#3498db" />
                <Text style={styles.title}>Zikirmatik</Text>
                <Text style={styles.subtitle}>Kalbinizi huzurla doldurun</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        gap: 16
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        fontWeight: '300'
    }
});
