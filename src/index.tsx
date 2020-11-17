import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import './assets/global.sass';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root-app'),
);
