type Plain = Record<string, unknown>;

const isPlain = (value: unknown): value is Plain =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** Drops `undefined` and empty objects (the server drops them too) and sorts keys, so equal values print equally */
function normalize(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalize);
  }
  if (!isPlain(value)) {
    return value;
  }
  const result: Plain = {};
  for (const key of Object.keys(value).sort()) {
    const inner = normalize(value[key]);
    if (inner !== undefined && !(isPlain(inner) && Object.keys(inner).length === 0)) {
      result[key] = inner;
    }
  }
  return result;
}

/**
 * Whether the saved (server) settings equal the current ones, for the Sync tab.
 * - Only keys the current state has are compared, so a key this client doesn't know can't hold it out of sync.
 * - A key (or a key inside `transcription` / `translation`) missing from the saved copy counts as its default:
 *   accounts saved before those settings were stored match while the user hasn't changed them, and
 *   stop matching, so "Save current" is available, once they have.
 * - Key order and `undefined` values don't matter.
 */
export function settingsMatch(saved: object | undefined | null, current: object | undefined | null, defaults: object): boolean {
  if (!saved || !current) {
    return false;
  }
  const savedValues = saved as Plain;
  const defaultValues = defaults as Plain;
  return (Object.keys(current) as string[]).every((key) => {
    const currentValue = (current as Plain)[key];
    const savedValue = savedValues[key];
    const withDefaults = isPlain(defaultValues[key]) && (savedValue === undefined || isPlain(savedValue))
      ? { ...(defaultValues[key] as Plain), ...(savedValue as Plain | undefined) }
      : savedValue ?? defaultValues[key];
    return JSON.stringify(normalize(withDefaults)) === JSON.stringify(normalize(currentValue));
  });
}
