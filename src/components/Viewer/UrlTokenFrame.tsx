import * as React from "react";
import {RouteComponentProps} from "react-router";
import {TokenContainer} from "./TokenContainer";

interface RouteParams{
    token: string
}


export class UrlTokenFrame extends React.Component<RouteComponentProps<RouteParams>>{
    render(): React.ReactNode {
        return <TokenContainer token={this.props.match.params.token}
                               title={"Cal Football 2019 - VIP SEAT"}/>
    }
}