const bufferizeGraphQLUpload = async (file) => {
  const { createReadStream } = await file;
  const readStream = createReadStream();
  const chunks = [];
  const buffer = await new Promise(resolve => {
    readStream.on('data', data => {
      chunks.push(data);
    });
    readStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
  });

  return buffer;
};

export { bufferizeGraphQLUpload };
