import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import colors from '../../../utils/colors';
type PopupProps = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function Popup({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: PopupProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        <View
          style={{
            backgroundColor: colors.accentLight,
            padding: 24,
            borderRadius: 16,
            width: '100%',
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.primary, marginBottom: 12 }}>
            {title}
          </Text>
          <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 24 }}>{message}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
            {onCancel && (
              <TouchableOpacity
                onPress={onCancel}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  backgroundColor: colors.textSecondary,
                }}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={onConfirm}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: 12,
                backgroundColor: colors.primary,
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
