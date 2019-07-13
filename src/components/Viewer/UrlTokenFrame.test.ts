import {CustomReader} from "./UrlTokenFrame";

describe("customReaderTest",()=>{
    it("sanity check", ()=>{
        const reader1 = new CustomReader("hello:world&big:name&megumin:explosion");
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
    })

});