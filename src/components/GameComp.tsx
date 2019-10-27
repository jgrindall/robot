//https://blog.bitsrc.io/why-and-how-use-typescript-in-your-react-app-60e8987be8de
import * as React from 'react';
import Game from "../babylon/game.ts";

class GameComp extends React.Component {
  render() {
    return <canvas width='1024' height='768' id="renderCanvas"></canvas>;
  }
}


window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'.
    let game = new Game('renderCanvas');

    // Create the scene.
    game.createScene();

    // Start render loop.
    game.doRender();
});


export default GameComp;
