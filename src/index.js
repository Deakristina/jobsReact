import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
// import App from './App';
// import PostJob from './PostJob';
import SearchJob from './SearchJob';
// import SearchProfile from './SearchProfile';
import 'bootstrap/dist/css/bootstrap.css';
=======
import App from './App';
// import PostJob from './PostJob';
// import 'bootstrap/dist/css/bootstrap.css';
>>>>>>> 35e40a2930756cd7f691890d5c1378a5e5af92c7
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<PostJob />, document.getElementById('root'));
// ReactDOM.render(<SearchProfile />, document.getElementById('root'));
ReactDOM.render(<SearchJob />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
