import * as React from "react";
import {Text} from "office-ui-fabric-react";

interface Props{
    out: string
}

interface State{

}

export class NumPassViewer extends React.Component<Props, State>{
    el: HTMLElement | null = null;

    public static randomNumString(len: number): string{
        let ans: string = "";
        for (let i = 0; i < len; i++) {
            let temp = Math.round(Math.random() * 9);
            ans += temp;
        }
        return ans;
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (prevProps.out === this.props.out) {
            return;
        }
        let remain = 7;
        let id = window.setInterval(() => {
            if (remain > 0) {
                if (this.el) {
                    this.el.innerText = NumPassViewer.randomNumString(6);
                }
                remain -= 1;
            }else{
                remain = 0;
                window.clearInterval(id);
                if (this.el) {
                this.el.innerText = this.props.out;

                }
            }
        }, 50);

    }


    render(): React.ReactNode {
        return <Text variant="xxLarge"><span ref={(el) => this.el = el}>{this.props.out}</span></Text>;
        }
    }

