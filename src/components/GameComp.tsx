//https://blog.bitsrc.io/why-and-how-use-typescript-in-your-react-app-60e8987be8de
import * as React from 'react';
import Game from "../babylon/game.ts";
import GameManager from "../babylon/GameManager";
import GameEntityMaker from '../babylon/GameEntityMaker';
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
    const world = game.getWorld();
    const meshMaker:MeshMaker = new MeshMaker(scene);
    const entityMaker:GameEntityMaker = new GameEntityMaker(meshMaker, world);
    const gameManager:GameManager = new GameManager(entityMaker);
    gameManager.addGround();
    window.gameManager = gameManager;
});


export default GameComp;
