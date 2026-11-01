import { formatSessionId } from './session-id';

describe('formatSessionId', () => {
  it.each([
    ['', ''],
    ['4', '4'],
    ['4N', '4N'],
    ['4NA', '4N-A'],
    ['4NA79', '4N-A79'],
    ['4NA79E', '4N-A79E'],
    ['4NA79EF', '4N-A79E-F'],
    ['4NA79EF2GV', '4N-A79E-F2GV'],
  ])('puts the dashes in "%s" at the right places: "%s"', (typed, expected) => {
    expect(formatSessionId(typed)).toBe(expected);
  });

  it('gives the same result for a whole id set in one go as for the same id typed', () => {
    let typed = '';
    for (const char of '4NA79EF2GV') {
      typed = formatSessionId(typed + char);
    }
    expect(formatSessionId('4NA79EF2GV')).toBe(typed);
    expect(typed).toBe('4N-A79E-F2GV');
  });

  it('leaves an id that is already formatted alone, and is idempotent', () => {
    expect(formatSessionId('4N-A79E-F2GV')).toBe('4N-A79E-F2GV');
    expect(formatSessionId(formatSessionId('4NA79EF2GV'))).toBe('4N-A79E-F2GV');
  });

  it('moves dashes that are in the wrong place', () => {
    expect(formatSessionId('4-NA79E')).toBe('4N-A79E');
    expect(formatSessionId('4N-A-79EF2GV')).toBe('4N-A79E-F2GV');
  });

  it('keeps the case the user typed', () => {
    expect(formatSessionId('4na79ef2gv')).toBe('4n-a79e-f2gv');
  });

  it('does not cut an id that is too long, so validation can reject it', () => {
    expect(formatSessionId('4NA79EF2GVX')).toBe('4N-A79E-F2GVX');
  });

  it('treats a missing value as empty', () => {
    expect(formatSessionId(null)).toBe('');
    expect(formatSessionId(undefined)).toBe('');
  });
});
