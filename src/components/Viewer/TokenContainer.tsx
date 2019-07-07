import * as React from "react";
import {authenticator} from "otplib";
import {TimeLeft} from "./TimeLeft";
import {Stack, Text} from "office-ui-fabric-react";


interface Props{
    token: string
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

        // check init next update time
        const sec: number = (new Date()).getSeconds();
        const next: number = 30 - ((sec - 1) % 30);

        this.state = {
            token:  props.token,
            timerID: window.setInterval(this.checkUpdate, 1000),
            numPass: authenticator.generate(props.token),
            nextUpdate: Date.now() + next * 1000
        };

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
            this.setState({nextUpdate: Date.now() + 30000})

        }
    }

    async periodUpdate(): Promise<void> {
        console.log("Updated");
        this.setState({numPass: authenticator.generate(this.state.token)})
        // to something
    };

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

        return <Stack>
            <Stack.Item align={"center"}>
                <Text variant="xxLarge">{this.state.numPass}</Text>
            </Stack.Item>
            <TimeLeft nextUpdate={this.state.nextUpdate} maxTimeLeft={30000}/>
        </Stack>
    }
}