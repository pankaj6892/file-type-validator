const getMimetype = (signature) => {
  switch (signature) {
    case "89504E47":
      return "image/png";
    case "47494638":
      return "image/gif";
    case "25504446":
      return "application/pdf";
    case "FFD8FFDB":
    case "FFD8FFE0":
    case "FFD8FFE1":
      return "image/jpeg";
    case "504B0304":
      return "application/zip";
    default:
      return "Unknown filetype";
  }
};

function returnFunc(val) {
  isFileValid(val);
}

function isFileValid(file) {
  if (typeof file === "object") {
    filereader.onloadend = function (evt) {
      if (evt.target.readyState === FileReader.DONE) {
        console.log(evt.target);
        const uint = new Uint8Array(evt.target.result);
        let bytes = [];
        uint.forEach((byte) => {
          bytes.push(byte.toString(16));
        });
        const hex = bytes.join("").toUpperCase();

        returnFunc(file.type === getMimetype(hex));
      }

      console.timeEnd("FileOpen");
    };

    const blob = file.slice(0, 4);
    filereader.readAsArrayBuffer(blob);
  } else {
    return file;
  }
}

module.exports = isFileValid;
