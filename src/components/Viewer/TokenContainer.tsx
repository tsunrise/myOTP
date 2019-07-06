import * as React from "react";
import {RouteComponentProps} from "react-router";

interface RouteParams{
    token: string
}

interface Props extends RouteComponentProps<RouteParams>{

}

interface States{
    timerID?: number, // todo: need to be destroyed somewhere
    token: string
}

export class TokenContainer extends React.Component<Props, States>{

    constructor(props: Props){
        super(props);
        this.state = {
            token:  props.match.params.token
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<States>, snapshot?: any): void {
        // Check if the token parameter is updated.
        if (prevProps.match.params.token !== this.props.match.params.token) {
            this.setState({token: this.props.match.params.token})
        }
    }

    render(): React.ReactNode {

        return <div>Current Token is: {this.state.token}</div>
    }
}