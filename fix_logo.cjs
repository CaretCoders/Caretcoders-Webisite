const fs = require('fs');
const zlib = require('zlib');

function getRaw(filename) {
  const buf = fs.readFileSync(filename);
  let pos = 8;
  const idatChunks = [];
  let width, height, colorType;
  while(pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.slice(pos + 4, pos + 8).toString('ascii');
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
      colorType = buf.readUInt8(pos + 17);
    } else if (type === 'IDAT') {
      idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  return { width, height, colorType, decompressed };
}

const d0 = getRaw('extracted_0.png');
const w = 502, h = 502;

// Let's create high-contrast RGBA image with #1D1D1F (brand black) and the exact alpha from the mask
const rgba = Buffer.alloc(w * h * 4);
for(let y=0; y<h; y++) {
  for(let x=0; x<w; x++) {
    const maskVal = d0.decompressed[y * (w + 1) + 1 + x];
    const idx = (y * w + x) * 4;
    // Solid deep dark slate #1D1D1F
    rgba[idx] = 29;
    rgba[idx + 1] = 29;
    rgba[idx + 2] = 31;
    rgba[idx + 3] = maskVal;
  }
}

// Encode PNG
function encodePNG(width, height, rgbaBuffer) {
  const rowSize = 1 + width * 4;
  const raw = Buffer.alloc(rowSize * height);
  for (let y = 0; y < height; y++) {
    raw[y * rowSize] = 0;
    rgbaBuffer.copy(raw, y * rowSize + 1, y * width * 4, (y + 1) * width * 4);
  }
  const idatData = zlib.deflateSync(raw);

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let k = 0; k < 8; k++) {
        c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
      }
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crc = crc32(buf.slice(4, 8 + len));
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const chunks = [
    header,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', idatData),
    makeChunk('IEND', Buffer.alloc(0))
  ];
  return Buffer.concat(chunks);
}

// Bounding box:
const minX = 140, maxX = 361, minY = 164, maxY = 337;
const pad = 6;
const cropX = Math.max(0, minX - pad);
const cropY = Math.max(0, minY - pad);
const cropW = Math.min(w, maxX + pad) - cropX;
const cropH = Math.min(h, maxY + pad) - cropY;
const cropRgba = Buffer.alloc(cropW * cropH * 4);

for (let y = 0; y < cropH; y++) {
  for (let x = 0; x < cropW; x++) {
    const srcIdx = ((cropY + y) * w + (cropX + x)) * 4;
    const destIdx = (y * cropW + x) * 4;
    cropRgba[destIdx] = rgba[srcIdx];
    cropRgba[destIdx + 1] = rgba[srcIdx + 1];
    cropRgba[destIdx + 2] = rgba[srcIdx + 2];
    cropRgba[destIdx + 3] = rgba[srcIdx + 3];
  }
}

const croppedPng = encodePNG(cropW, cropH, cropRgba);
const b64 = croppedPng.toString('base64');

// Square viewBox for balanced icon rendering
const maxDim = Math.max(cropW, cropH);
const offX = ((maxDim - cropW) / 2).toFixed(1);
const offY = ((maxDim - cropH) / 2).toFixed(1);

const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${maxDim} ${maxDim}" width="100%" height="100%">
  <image x="${offX}" y="${offY}" width="${cropW}" height="${cropH}" href="data:image/png;base64,${b64}" preserveAspectRatio="xMidYMid meet" />
</svg>`;

fs.writeFileSync('src/assets/images/caretcoders_logo.svg', cleanSvg);
fs.writeFileSync('public/caretcoders_logo.svg', cleanSvg);
fs.writeFileSync('src/assets/images/caretcoders_logo.png', croppedPng);
fs.writeFileSync('public/caretcoders_logo.png', croppedPng);
fs.writeFileSync('assets/caretcoders_logo.svg', cleanSvg);
fs.writeFileSync('assets/caretcoders_logo.png', croppedPng);

console.log('Saved high-contrast logo! Dimensions:', cropW, 'x', cropH, 'maxDim:', maxDim);
