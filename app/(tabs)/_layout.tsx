import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: '#fff' },
            headerShadowVisible: false,
            tabBarActiveTintColor: '#3498db',
            tabBarStyle: { borderTopWidth: 1, borderTopColor: '#f0f0f0' }
        }}>
            <Tabs.Screen
                name="counter"
                options={{
                    title: 'Zikirmatik',
                    tabBarLabel: 'Zikirmatik',
                    tabBarIcon: ({ color, size }) => <Ionicons name="finger-print-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="advice"
                options={{
                    title: 'Zikir Tavsiyesi',
                    tabBarLabel: 'Tavsiyeler',
                    tabBarIcon: ({ color, size }) => <Ionicons name="bulb-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="my-dhikrs"
                options={{
                    title: 'Zikirlerim',
                    tabBarLabel: 'Zikirlerim',
                    tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
