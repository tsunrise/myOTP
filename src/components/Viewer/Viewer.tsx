import {Route, RouteComponentProps} from "react-router";
import * as React from "react";
import {UrlTokenFrame} from "./UrlTokenFrame";
import {Stack} from "office-ui-fabric-react";

interface MasterRouteParams {

}

interface ViewerProps extends RouteComponentProps<MasterRouteParams>{

}

interface ViewerState{

}

/**
 * Temporarily define a class that is used when no param is specified.
 */
class Unspecified extends React.Component{
    render(): React.ReactNode {
        return <div>Viewer Token not specified. </div>
    }
}

export class Viewer extends React.Component<ViewerProps, ViewerState>{


    render(): React.ReactNode {
        return <Stack>
            <Route path={this.props.match.url + '/'} exact component={Unspecified}/>
            <Route path={this.props.match.url + '/:token'} component={UrlTokenFrame} />
        </Stack>;
    }
}