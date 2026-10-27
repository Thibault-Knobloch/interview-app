import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../constants/theme';
import { API_URL } from '../services/api';

export default function ErrorMessage({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.hint}>Server: {API_URL}</Text>
      <Pressable onPress={onRetry}>
        <Text style={styles.retry}>Try again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, alignItems: 'center', gap: spacing.sm },
  message: { color: colors.error, fontSize: 16, textAlign: 'center' },
  hint: { color: colors.muted, fontSize: 13 },
  retry: { color: colors.accent, fontSize: 16, fontWeight: '600' },
});
