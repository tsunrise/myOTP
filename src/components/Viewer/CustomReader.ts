export default class {
    params: { [propName: string]: string } = {};

    constructor(customParam: string) {
        for (let param of customParam.split('&')) {
            let [prop, val] = param.split('=');
            if (!val) {
                console.error(`Value of "${prop}" is undefined.`);
                continue;
            }
            this.params[prop] = val;
        }
    }

    get paramObject(): { [propName: string]: string } {
        return this.params;
    }

    get title(): string {
        return this.params.title || "One Time Password";
    }

    get id(): string {
        return this.params.id || "";
    }

    get description(): string {
        return this.params.d || ""
    }

    get barcode(): boolean {
        return this.params.barcode === 't'
    }

    get barcodePattern(): ((numPass: string) => string) | null {
        if (!this.params.barcode_pattern) {
            return null;
        }
        return (numPass => {
            let strProcessed = this.params.barcode_pattern;
            let numPassStr = numPass.toString();
            for (let i = 0, ptr = 0; i < strProcessed.length && ptr < 6; i++) {
                if (strProcessed.charAt(i) === '*') {
                    strProcessed = strProcessed.slice(0, i) + numPassStr[ptr] + strProcessed.slice(i+1, strProcessed.length);
                    ptr++;
                }
            }

            return strProcessed;
        })
    }


}