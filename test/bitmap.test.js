const assert = require('assert');
const fs = require('fs');
const invert = require('../lib/invert-colors');
const grayscale = require('../lib/grayscale-colors');
const BitmapHeader = require('../lib/bitmap-header');
const BitmapTransform = require('../lib/bitmap-transform');

let palette = null;
let noPalette = null;

describe('reads bitmap file header', () => {

    before(done => {
        fs.readFile('./test/palette-bitmap.bmp', (err, data) => {
            if(err) done(err);
            else {
                palette = data;
                done();
            }
        });
    });

    before(done => {
        fs.readFile('./test/non-palette-bitmap.bmp', (err, data) => {
            if (err) done(err);
            else {
                noPalette = data;
                done();
            }
        });
    });


    it('reads the header for no palette', () => {
        const header = new BitmapHeader(noPalette);
        assert.equal(header.fileSize, 30054);
        assert.equal(header.isPaletted, false);
        assert.equal(header.pixelOffset, 54);
        assert.equal(header.bitsPerPixel, 24);
    });

    it('reads the header for palette', () => {
        const header = new BitmapHeader(palette);
        assert.equal(header.fileSize, 11078);
        assert.equal(header.isPaletted, 256);
        assert.equal(header.pixelOffset, 1078);
        assert.equal(header.bitsPerPixel, 8);
    });
});

describe('transforms to non-paletted bpm both inverted and grayscale', () => {

    it('inverts non-paletted bpm', () => {
        const bitmap = new BitmapTransform(noPalette);
        const bmpBuffer = bitmap.transformWithOutPalette(invert);

        bitmap.write('./test/output.bmp', bmpBuffer, (err) => {
            if (err) return err;
            else {
                fs.readFile('./test/output.bmp', (err, buffer) => {
                    assert.deepEqual(bmpBuffer, buffer);
                    done();
                });
            }
        });
    });

    it('grayscales non-paletted bpm', () => {
        const bitmap = new BitmapTransform(noPalette);
        const bmpBuffer = bitmap.transformWithOutPalette(grayscale);

        bitmap.write('./test/grayscale-output.bmp', bmpBuffer, (err) => {
            if (err) return err;
            else {
                fs.readFile('./test/output.bmp', (err, buffer) => {
                    assert.deepEqual(bmpBuffer, buffer);
                    done();
                });
            }
        });
    });
    
    it('', () => {

    });

});