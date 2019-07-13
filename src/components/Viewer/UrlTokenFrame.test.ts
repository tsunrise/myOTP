import CustomReader from "./CustomReader";

describe("customReaderTest",()=>{
    it("sanity check", ()=>{
        const reader1 = new CustomReader("hello=world&big=name&megumin=explosion");
        const object1 = reader1.paramObject;

        let count = 0;
        for (let key in object1) {
            count += 1;
        }

        expect(count).toBe(3);

        expect(object1.hello).toBe('world');
        expect(object1.big).toBe('name');
        expect(object1.megumin).toBe('explosion')
    });

    it("empty check", ()=>{
        const reader2 = new CustomReader("");
        const object2 = reader2.paramObject;

        let count = 0;
        for (let key in object2) {
            count += 1;
        }

        expect(count).toBe(0);
    });

    it("barcode pattern",()=>{
        const reader3 = new CustomReader("barcodePattern=*#3001#12345#*");
        const barcode1 = reader3.barcodePattern(366455);
        expect(barcode1).toBe("3#3001#12345#6");

        const reader4 = new CustomReader("barcodePattern=a******bc");
        const barcode2 = reader4.barcodePattern(937429);
        expect(barcode2).toBe("a937429bc");

        const reader5 = new CustomReader("barcodePattern=a*******b*c");
        const barcode3 = reader5.barcodePattern(937429);
        expect(barcode3).toBe("a937429*b*c")
    })

});