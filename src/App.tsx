import * as React from 'react';
import {HashRouter, Route} from "react-router-dom";
import {Viewer} from "./components/Viewer/Viewer";
import {Stack} from "office-ui-fabric-react";
import styles from './App.module.css';

interface AppProp {

}

interface AppState {

}

class App extends React.Component<AppProp, AppState> {
    render() {
        return <HashRouter>
            <Stack className="App">
                <Stack.Item align="center" className={styles.centralBox}>
                    <Stack>
                        <Stack.Item align={"center"}>
                            <h3>MyOTP</h3>
                        </Stack.Item>
                    </Stack>
                    <Route path="/" exact/>
                    <Route path="/view" component={Viewer}/>
                </Stack.Item>

        </Stack>
        </HashRouter>;

    };
}

export default App;
