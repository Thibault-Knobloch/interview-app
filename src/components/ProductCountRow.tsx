import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, spacing } from '../constants/theme';
import { parseCount } from '../utils/countPayload';
import type { Product } from '../types';

interface Props {
  product: Product;
  count: number | undefined;
  onChange: (count: number) => void;
}

export default function ProductCountRow({ product, count, onChange }: Props) {
  const [text, setText] = useState(count === undefined ? '' : String(count));

  useEffect(() => {
    setText(count === undefined ? '' : String(count));
  }, [count]);

  function handleEndEditing() {
    const parsed = parseCount(text);
    if (parsed === null) setText(count === undefined ? '' : String(count));
    else onChange(parsed);
  }

  const step = (delta: number) => onChange(Math.max(0, (count ?? 0) + delta));

  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.unit}>{product.unit}</Text>
      </View>
      <Pressable style={styles.stepButton} onPress={() => step(-1)} accessibilityLabel={`Decrease ${product.name}`}>
        <Text style={styles.stepText}>−</Text>
      </Pressable>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        onEndEditing={handleEndEditing}
        keyboardType="decimal-pad"
        placeholder="–"
        placeholderTextColor={colors.muted}
        selectTextOnFocus
      />
      <Pressable style={styles.stepButton} onPress={() => step(1)} accessibilityLabel={`Increase ${product.name}`}>
        <Text style={styles.stepText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  info: { flex: 1 },
  name: { fontSize: 16, color: colors.text },
  unit: { fontSize: 13, color: colors.muted },
  stepButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: { fontSize: 20, color: colors.accent },
  input: {
    width: 64,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    textAlign: 'center',
    fontSize: 16,
    color: colors.text,
  },
});
