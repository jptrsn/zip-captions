/**
 * Settings shown as a single value in the Sync tab. Grouped settings (`transcription`, `translation`)
 * are objects: they have no label key and would print as "[object Object]", so they are left out.
 */
export function isSimpleSettingValue(value: unknown): boolean {
  return value === null || typeof value !== 'object';
}
