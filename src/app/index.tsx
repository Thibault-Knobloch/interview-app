import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import ErrorMessage from '../components/ErrorMessage';
import { colors, spacing } from '../constants/theme';
import { fetchAreas } from '../services/inventoryService';
import { useCountDraftStore } from '../stores/countDraftStore';
import type { StorageArea } from '../types';

export default function AreasScreen() {
  const [areas, setAreas] = useState<StorageArea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const drafts = useCountDraftStore((s) => s.drafts);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setAreas(await fetchAreas());
    } catch (err) {
      console.error('Could not load areas', err);
      setError('Could not load storage areas.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error) return <ErrorMessage message={error} onRetry={load} />;
  if (isLoading && areas.length === 0) return <ActivityIndicator style={styles.loader} color={colors.accent} />;

  return (
    <FlatList
      data={areas}
      keyExtractor={(area) => String(area.id)}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={load} />}
      ListHeaderComponent={<Text style={styles.header}>Pick a storage area to count</Text>}
      renderItem={({ item }) => {
        const counted = Object.keys(drafts[item.id] ?? {}).length;
        return (
          <Pressable style={styles.card} onPress={() => router.push(`/area/${item.id}`)}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>
              {counted > 0 ? `${counted}/${item.productCount} counted · not saved` : `${item.productCount} products`}
            </Text>
          </Pressable>
        );
      }}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  loader: { marginTop: spacing.lg },
  list: { padding: spacing.md, gap: spacing.sm },
  header: { color: colors.muted, marginBottom: spacing.xs },
  card: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  name: { fontSize: 17, fontWeight: '600', color: colors.text },
  meta: { marginTop: 2, color: colors.muted },
});
