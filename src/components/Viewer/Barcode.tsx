import * as React from "react";
import JsBarcode from "jsbarcode";
import {Stack} from "office-ui-fabric-react";

interface Props {
    code: string
}

export class Barcode extends React.Component<
    Props,
    {}>
{
    svg: SVGSVGElement | null = null;

    constructor(props: Props) {
        super(props);
        this.updateBarcode = this.updateBarcode.bind(this);
        this.updateBarcode();
    }


    componentDidMount(): void {
        this.updateBarcode()
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
        this.updateBarcode();
    }

    updateBarcode():void{
        if (this.svg) {
            JsBarcode(this.svg, this.props.code)
        }
    }

    render(): React.ReactNode {
        return (
              <svg ref={svg => {this.svg = svg}}/>
        )
    }
}