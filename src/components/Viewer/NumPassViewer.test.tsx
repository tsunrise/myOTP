import {NumPassViewer} from "./NumPassViewer";

test("Demo Test", () => {
    // let x = new NumPassViewer({out: 123456});
   console.log(NumPassViewer.randomNumString(6));
   expect(NumPassViewer.randomNumString(6).length).toBe(6);
});