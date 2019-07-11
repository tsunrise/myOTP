import * as React from "react";
import {authenticator} from "otplib";
import {TimeLeft} from "./TimeLeft";
import {Stack, Text} from "office-ui-fabric-react";

import styles from "./TokenContainer.module.css";
import {Barcode} from "./Barcode";
import {NumPassViewer} from "./NumPassViewer";


interface Props{
    token: string,
    title?: string,
    ticketID?: string,
    supportURL?: string,
    barcodePattern?: (numPass: number) => string,
    barcode?: boolean
}

interface States{
    timerID?: number,
    token: string,
    numPass: string,
    nextUpdate: number
}

export class TokenContainer extends React.Component<Props, States>{

    constructor(props: Props){
        super(props);
        this.checkUpdate = this.checkUpdate.bind(this);
        this.periodUpdate = this.periodUpdate.bind(this);
        this.defaultID = this.defaultID.bind(this);

        // check init next update time
        const sec: number = (new Date()).getSeconds();
        const next: number = 30 - ((sec - 1) % 30);

        this.state = {
            token:  props.token,
            timerID: window.setInterval(this.checkUpdate, 1000),
            numPass: authenticator.generate(props.token),
            nextUpdate: Date.now() + next * 1000
        };

        document.title = this.props.title || "MyOTP";

    }

    /**
     * Every second, check if the system time is 0 or 30s.
     * If true, do the call back.
     * Otherwise, pass.
     */
    async checkUpdate(): Promise<void>{
        const sec = (new Date()).getSeconds();
        if (sec === 1|| sec === 31) {
            this.periodUpdate().then();
            return;
        }

        // deal with browser timing glitch
        if (Date.now() > this.state.nextUpdate) {
            console.warn("A Browser Timing Glitch Happened. ");
            this.periodUpdate().then();
        }
    }

    async periodUpdate(): Promise<void> {
        console.log("Updated");
        this.setState({numPass: authenticator.generate(this.state.token), nextUpdate: Date.now() + 30000})
        // to something
    };

    defaultID(): string{
        return this.props.token.slice(0,6).toUpperCase()
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<States>, snapshot?: any): void {
        // Check if the token parameter is updated.
        if (prevProps.token !== this.props.token) {
            this.setState({token: this.props.token,
                numPass: authenticator.generate(this.props.token)})
        }
    }

    componentWillUnmount(): void {
        clearInterval(this.state.timerID);
        this.setState({timerID: undefined})
    }

    render(): React.ReactNode {
        const barcode = this.props.barcode ?
            <Stack.Item align="center">
            <Barcode code={(this.props.ticketID || this.defaultID()) + this.state.numPass}/>
        </Stack.Item> : null;

        return <Stack>
            <Stack.Item align="center"  className={styles.marginDown}>
                <Text variant="mediumPlus">{this.props.title || "MyOTP"}</Text>
            </Stack.Item>
            <Stack.Item align="center">
                <Text variant="xLarge" className={styles.marginDown}>{this.props.ticketID || this.defaultID()}</Text>
            </Stack.Item>
            <Stack.Item align={"center"}>
                <NumPassViewer out={this.state.numPass}/>
            </Stack.Item>
            <TimeLeft nextUpdate={this.state.nextUpdate} maxTimeLeft={30000}/>
            {barcode}
        </Stack>
    }
}