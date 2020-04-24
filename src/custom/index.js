const stream = require('stream');

const isReadableStream = value =>
  value instanceof stream.Stream &&
  typeof (value._read === 'function') &&
  typeof (value._readableState === 'object');

const nodeIsExtractableFile = value => isReadableStream(value) || Buffer.isBuffer(value);

export { nodeIsExtractableFile };
