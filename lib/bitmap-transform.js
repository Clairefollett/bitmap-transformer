const BitmapHeader = require('./bitmap-header');
const fs = require('fs');

module.exports = class BitmapTransform {
    constructor(buffer) {
        this.header = new BitmapHeader(buffer);
        this.buffer = buffer;
    }

    transformWithOutPalette(transformation) {
        
        const header = this.header;
        const buffer = this.buffer;

        let offset = header.pixelOffset;

        while(offset < header.fileSize) {
            const color = {
                b: buffer.readUInt8(offset),
                g: buffer.readUInt8(offset + 1),
                r: buffer.readUInt8(offset + 2)  
            };
            const newColor = transformation(color);
            buffer.writeUInt8(newColor.b, offset);
            buffer.writeUInt8(newColor.g, offset + 1);
            buffer.writeUInt8(newColor.r, offset + 2);

            offset += 3;
        }
            
        return buffer;
    }

    transformWithPalette(transformation) {
        
        const header = this.header;
        const buffer = this.buffer;

        let offset = header.totalHeaderSize;

        while(offset < header.pixelOffset) {
            const color = {
                b: buffer.readUInt8(offset),
                g: buffer.readUInt8(offset + 1),
                r: buffer.readUInt8(offset + 2)  
            };
            const newColor = transformation(color);
            buffer.writeUInt8(newColor.b, offset);
            buffer.writeUInt8(newColor.g, offset + 1);
            buffer.writeUInt8(newColor.r, offset + 2);

            offset += 4;
        }
            
        return buffer;
    }

    write(filename, data, cb) {
        fs.writeFile(filename, data, cb)
    }   
};
