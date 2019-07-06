import {RouteComponentProps} from "react-router";
import * as React from "react";
import {authenticator} from "otplib";

interface MasterRouteParams {
    id: string
}

interface MasterProps extends RouteComponentProps<MasterRouteParams>{

}

interface MasterState{

}

export class Master extends React.Component<MasterProps, MasterState>{


    render(): React.ReactNode {
        const secret = this.props.match.params.id;
        const token = authenticator.generate(secret);
        return <div>Tokens are {token}</div>;
    }
}