import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';

interface CounterButtonProps {
    onPress: () => void;
    count: number;
    target?: number | null;
}

const { width } = Dimensions.get('window');

export const CounterButton: React.FC<CounterButtonProps> = ({ onPress, count, target }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View style={styles.circle}>
                <Text style={styles.countText}>{count}</Text>
                {target && (
                    <Text style={styles.targetText}>Hedef: {target}</Text>
                )}
            </View>
            <Text style={styles.tapHint}>Çekmek için dokun</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    circle: {
        width: width * 0.7,
        height: width * 0.7,
        borderRadius: (width * 0.7) / 2,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    countText: {
        fontSize: 72,
        fontWeight: 'bold',
        color: '#fff',
    },
    targetText: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 4,
    },
    tapHint: {
        fontSize: 16,
        color: '#888',
        marginTop: 30,
        textTransform: 'uppercase',
        letterSpacing: 2
    }
});
