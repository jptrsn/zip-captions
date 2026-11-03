import buffer from 'node:buffer';

// Node 25+ / modern Node deprecates and removes SlowBuffer, but legacy transitive
// dependencies (e.g. jsonwebtoken -> jws -> jwa -> buffer-equal-constant-time)
// read SlowBuffer.prototype.equal at import time.
if (!(buffer as any).SlowBuffer) {
  (buffer as any).SlowBuffer = buffer.Buffer;
}

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nodeBuffer = require('buffer');
  if (nodeBuffer && !nodeBuffer.SlowBuffer) {
    nodeBuffer.SlowBuffer = nodeBuffer.Buffer;
  }
} catch {
  // Ignore if buffer cannot be required directly
}
