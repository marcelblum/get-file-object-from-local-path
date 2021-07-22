function LocalFileData(path, limitBytes, knownType) {
  this.arrayBuffer = (() => {
    var buffer;
    const fs = require('fs');
    if (limitBytes) {
      buffer = Buffer.alloc(limitBytes);
      const fileID = fs.openSync(path, "r");
      fs.readSync(fileID, buffer, 0, limitBytes);
      fs.closeSync(fileID);
    } else {
      buffer = fs.readFileSync(path);
    }
    var arrayBuffer = buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    return [arrayBuffer];
  })();

  this.name = require('path').basename(path);

  this.type = knownType || require('mime-types').lookup(require('path').extname(path)) || undefined;
}

function constructFileFromLocalFileData(localFileData) {
  return new File(localFileData.arrayBuffer, localFileData.name, { type: localFileData.type });
};

module.exports = {
  LocalFileData,
  constructFileFromLocalFileData,
};
