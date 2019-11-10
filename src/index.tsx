
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GameComp from './components/GameComp';
import CodeComp from './components/CodeComp';
import './index.css';

class App extends React.Component {
  constructor() {
      this.state = {data: []]};
    }
    render() {
      return   <div className="App">
          <GameComp className="game-comp"/>
          <CodeComp className="code-comp"/>
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
