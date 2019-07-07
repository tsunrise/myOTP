import {Route, RouteComponentProps} from "react-router";
import * as React from "react";
import {UrlTokenFrame} from "./UrlTokenFrame";
import {Stack, Text} from "office-ui-fabric-react";
import styles from "./Viewer.module.css";

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
            <Stack.Item align="center"  className={styles.marginDown}>
                <Text variant="mediumPlus">Title</Text>
            </Stack.Item>
            <Stack.Item align="center">
                <Text variant="xLarge" className={styles.marginDown}>ID</Text>
            </Stack.Item>
            <Route path={this.props.match.url + '/'} exact component={Unspecified}/>
            <Route path={this.props.match.url + '/:token'} component={UrlTokenFrame} />
        </Stack>;
    }
}