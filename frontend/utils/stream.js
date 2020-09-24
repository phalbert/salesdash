
export function streamFile(file, callback) {
  var fileSize = file.size;
  var chunkSize = 64 * 1024; // bytes
  var offset = 0;
  var chunkReaderBlock = null;

  var readEventHandler = function (evt) {
    if (evt.target.error == null) {
      offset += evt.target.result.length;
      callback(evt.target.result); // callback function for handling read chunk
    } else {
      console.log("Read error: " + evt.target.error);
      return;
    }
    if (offset >= fileSize) {
      console.log("Done reading file");
      return;
    }

    // of to the next chunk
    chunkReaderBlock(offset, chunkSize, file);
  };

  chunkReaderBlock = function (_offset, length, _file) {
    var r = new FileReader();
    var blob = _file.slice(_offset, length + _offset);
    r.onload = readEventHandler;
    r.readAsText(blob);
  };

  // now let's start the read with the first block
  chunkReaderBlock(offset, chunkSize, file);
}
