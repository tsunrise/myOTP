import * as React from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";
import {Master} from "./components/Master";
import './App.css';

interface AppProp {

}

interface AppState {

}

class App extends React.Component<AppProp, AppState> {
    render() {
        return <BrowserRouter>
            <div className="App">
            Hello World
                <br/>
                <Route path="/" exact/>
                <Route path="/:id" component={Master}/>
        </div>
        </BrowserRouter>;

    };
}

export default App;
