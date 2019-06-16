import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import store from "./store/index";
import {Provider} from "react-redux";
import * as serviceWorker from './serviceWorker';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

serviceWorker.register();
