import * as React from "react";
import {RouteComponentProps} from "react-router";
import {TokenContainer} from "./TokenContainer";
import {Stack, Text} from "office-ui-fabric-react";
import Style from "./UrlTokenFrame.module.css";

interface RouteParams {
    token: string,
    property?: string
}

export class CustomReader {
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


}

interface State {
    propReader: CustomReader;
}


export class UrlTokenFrame extends React.Component<RouteComponentProps<RouteParams>, State> {
    constructor(prop: RouteComponentProps<RouteParams>) {
        super(prop);
        this.state = {propReader: new CustomReader(prop.match.params.property || "")};
    }

    componentDidUpdate(prevProps: Readonly<RouteComponentProps<RouteParams>>, prevState: Readonly<State>, snapshot?: any): void {
        if (prevProps.match.params.property !== this.props.match.params.property) {
            this.setState({propReader: new CustomReader(this.props.match.params.property || "")});
        }
    }

    render(): React.ReactNode {
        return (
            <Stack className={Style.MainFrame}>
                <Stack.Item grow={8}>
                    <TokenContainer token={this.props.match.params.token}
                                    title={this.state.propReader.title}
                                    ticketID={this.state.propReader.id}
                                    barcode={this.state.propReader.barcode}
                    />
                </Stack.Item>
                <Stack.Item align={"center"} className={Style.x} grow={1}>
                    <Text variant="tiny"> {this.state.propReader.description} </Text>
                </Stack.Item>
            </Stack>
        )
    }
}