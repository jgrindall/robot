import * as BABYLON from 'babylonjs';
import Game from './Game';
import GameObjectMaker from './GameObjectMaker';
import GameObject from './GameObject';

class GameManager {
    private _game: Game;
    private _gameObjectMaker: GameObjectMaker;

    constructor(game:Game, gameObjectMaker:GameObjectMaker) {
      this._game = game;
      this._gameObjectMaker = gameObjectMaker;
    }

    add(defn:string):void{
      const gameObj:GameObject = this._gameObjectMaker.make(defn);
      return gameObj;
    }
}

export default GameManager;
