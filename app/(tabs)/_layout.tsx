import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import i18n from '../../src/i18n';

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
                    title: i18n.t('tab_counter'),
                    tabBarLabel: i18n.t('tab_counter'),
                    tabBarIcon: ({ color, size }) => <Ionicons name="finger-print-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="advice"
                options={{
                    title: i18n.t('tab_advice'),
                    tabBarLabel: i18n.t('tab_advice'),
                    tabBarIcon: ({ color, size }) => <Ionicons name="bulb-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="my-dhikrs"
                options={{
                    title: i18n.t('tab_my_dhikrs'),
                    tabBarLabel: i18n.t('tab_my_dhikrs'),
                    tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
