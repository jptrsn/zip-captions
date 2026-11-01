/**
 * Formats a broadcast session id as it is typed or pasted: two characters, four, four, separated by dashes
 * (`4N-A79E-F2GV`). Dashes are removed and put back in the right places, so the result does not depend on
 * how the value arrived. A dash only appears once there is a character after it.
 */
export function formatSessionId(value: string | null | undefined): string {
  const characters = (value ?? '').replace(/-/g, '');
  const groups = [characters.slice(0, 2), characters.slice(2, 6), characters.slice(6)];
  return groups.filter((group) => group.length > 0).join('-');
}
