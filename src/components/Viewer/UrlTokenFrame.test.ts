import {CustomReader} from "./UrlTokenFrame";

describe("customReaderTest",()=>{
    it("sanity check", ()=>{
        let reader1 = new CustomReader("hello:world&big:name&megumin:explosion");
        let object1 = reader1.paramObject;

        expect(object1.hello).toBe('world');
        expect(object1.big).toBe('name');
        expect(object1.megumin).toBe('explosion')
    })

});