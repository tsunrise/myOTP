import * as React from 'react';
import {HashRouter, Route} from "react-router-dom";
import {Viewer} from "./components/Viewer/Viewer";
import './App.css';

interface AppProp {

}

interface AppState {

}

class App extends React.Component<AppProp, AppState> {
    render() {
        return <HashRouter>
            <div className="App">
            MYOTP App
                <br/>
                <Route path="/" exact/>
                <Route path="/view" component={Viewer}/>
        </div>
        </HashRouter>;

    };
}

export default App;
