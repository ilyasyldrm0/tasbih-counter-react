import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import i18n from '../i18n';

interface DhikrFormProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; text: string; target?: number }) => void;
    initialData?: { name: string; text: string; target?: number | null } | null;
    title: string;
}

export const DhikrFormModal: React.FC<DhikrFormProps> = ({ visible, onClose, onSubmit, initialData, title }) => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [target, setTarget] = useState('');

    useEffect(() => {
        if (visible) {
            setName(initialData?.name || '');
            setText(initialData?.text || '');
            setTarget(initialData?.target ? initialData.target.toString() : '');
        }
    }, [visible, initialData]);

    const handleSave = () => {
        if (!name.trim()) return;
        onSubmit({
            name,
            text,
            target: target ? parseInt(target, 10) : undefined
        });
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{title}</Text>

                    <ScrollView contentContainerStyle={styles.scroll}>
                        <Text style={styles.label}>Zikir Adı *</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Örn: Günlük Tesbihat"
                            placeholderTextColor="#999"
                        />

                        <Text style={styles.label}>Zikir Metni</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={text}
                            onChangeText={setText}
                            placeholder="Örn: Subhanallah"
                            placeholderTextColor="#999"
                            multiline
                        />

                        <Text style={styles.label}>Hedef (Opsiyonel)</Text>
                        <TextInput
                            style={styles.input}
                            value={target}
                            onChangeText={setTarget}
                            placeholder="Örn: 33"
                            placeholderTextColor="#999"
                            keyboardType="number-pad"
                        />
                    </ScrollView>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.btn, styles.cancelBtn]} onPress={onClose}>
                            <Text style={styles.btnTextCancel}>İptal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, styles.saveBtn]} onPress={handleSave}>
                            <Text style={styles.btnTextSave}>Kaydet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333'
    },
    scroll: {
        paddingBottom: 20
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: '#555'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: '#fafafa',
        color: '#333'
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top'
    },
    buttons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 10
    },
    btn: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelBtn: {
        backgroundColor: '#f5f5f5'
    },
    saveBtn: {
        backgroundColor: '#3498db'
    },
    btnTextCancel: {
        color: '#666',
        fontWeight: '600'
    },
    btnTextSave: {
        color: 'white',
        fontWeight: '600'
    }
});
