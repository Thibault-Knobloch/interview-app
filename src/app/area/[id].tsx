import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ErrorMessage from '../../components/ErrorMessage';
import ProductCountRow from '../../components/ProductCountRow';
import { colors, spacing } from '../../constants/theme';
import { fetchProducts, submitCount } from '../../services/inventoryService';
import { useCountDraftStore } from '../../stores/countDraftStore';
import { buildCountPayload, type CountDraft } from '../../utils/countPayload';
import type { Product } from '../../types';

const EMPTY_DRAFT: CountDraft = {};

export default function CountAreaScreen() {
  const areaId = Number(useLocalSearchParams<{ id: string }>().id);
  const insets = useSafeAreaInsets();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const draft = useCountDraftStore((s) => s.drafts[areaId]) ?? EMPTY_DRAFT;
  const setCount = useCountDraftStore((s) => s.setCount);
  const clearArea = useCountDraftStore((s) => s.clearArea);
  const countedCount = Object.keys(draft).length;

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setProducts(await fetchProducts(areaId));
    } catch (err) {
      console.error(`Could not load products for area ${areaId}`, err);
      setError('Could not load products.');
    } finally {
      setIsLoading(false);
    }
  }, [areaId]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave() {
    setIsSaving(true);
    try {
      await submitCount(buildCountPayload(areaId, draft));
      clearArea(areaId);
      Alert.alert('Count saved', `${countedCount} products saved.`);
      router.back();
    } catch (err) {
      console.error('Could not save count', err);
      Alert.alert('Could not save', (err as Error).message);
    } finally {
      setIsSaving(false);
    }
  }

  if (error) return <ErrorMessage message={error} onRetry={load} />;
  if (isLoading) return <ActivityIndicator style={styles.loader} color={colors.accent} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(product) => product.productKey}
        renderItem={({ item }) => (
          <ProductCountRow
            product={item}
            count={draft[item.productKey]}
            onChange={(count) => setCount(areaId, item.productKey, count)}
          />
        )}
      />
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Text style={styles.progress}>
          {countedCount}/{products.length} counted
        </Text>
        <Pressable
          style={[styles.saveButton, (countedCount === 0 || isSaving) && styles.saveButtonDisabled]}
          disabled={countedCount === 0 || isSaving}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>{isSaving ? 'Saving…' : 'Save count'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { marginTop: spacing.lg },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  progress: { color: colors.muted },
  saveButton: {
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
  },
  saveButtonDisabled: { opacity: 0.4 },
  saveText: { color: colors.accentText, fontWeight: '600', fontSize: 16 },
});
