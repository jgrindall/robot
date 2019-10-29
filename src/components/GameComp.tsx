//https://blog.bitsrc.io/why-and-how-use-typescript-in-your-react-app-60e8987be8de
import * as React from 'react';
import Game from "../babylon/game.ts";
import GameManager from "../babylon/GameManager";
import GameObjectMaker from '../babylon/GameObjectMaker';
import MeshMaker from "../babylon/MeshMaker";

class GameComp extends React.Component {
  render() {
    return <canvas width='1024' height='768' id="renderCanvas"></canvas>;
  }
}


window.addEventListener('DOMContentLoaded', () => {
    let game = new Game('renderCanvas');
    game.createScene();
    game.doRender();
    const scene = game.getScene();
    const meshMaker:MeshMaker = new MeshMaker(scene);
    const gameObjectMaker:GameObjectMaker = new GameObjectMaker(meshMaker, scene);
    const gameManager:GameManager = new GameManager(game, gameObjectMaker);
    window.go = gameManager.add("1234");
});


export default GameComp;
