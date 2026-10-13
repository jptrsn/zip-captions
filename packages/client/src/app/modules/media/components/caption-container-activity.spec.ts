import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * The caption container is moved into the Picture-in-Picture window; the drawer around it stays in
 * the main window. Pointer activity listened for on the drawer therefore never fires in the PiP
 * window, and the idle-faded controls (pointer-events: none once hidden) could not be brought back.
 * The container needs its own listeners. Component specs for this screen can't be set up here, so
 * this guards the template itself.
 */
describe('recognition-render caption container', () => {
  const html = readFileSync(join(__dirname, 'recognition-render', 'recognition-render.component.html'), 'utf8');
  const container = html.match(/<div #captionContainer\b[^>]*>/s)?.[0] ?? '';

  it('is found', () => {
    expect(container).not.toBe('');
  });

  it.each(['mouseenter', 'mousemove', 'touchstart'])('wakes the controls on %s inside the container', (event) => {
    expect(container).toContain(`(${event})="onUserActivity()"`);
  });
});
