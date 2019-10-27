import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import GameComp from './components/GameComp';
import CodeComp from './components/CodeComp';

const logo = require('./logo.svg');

const App = () => (
  <div className="App">
    <img className="App-logo" src={logo} alt="React" />
    <h1 className="App-Title">Hello Parcel React TypeScript</h1>
    <GameComp />
    <CodeComp/>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

//Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
