import GameEntityMaker from './GameEntityMaker';
import GameEntity from './GameEntity';

class GameManager {
    private _entityMaker:GameEntityMaker;

    constructor(entityMaker:GameEntityMaker) {
      this._entityMaker = entityMaker;
    }
    addBlob(defn:string):GameEntity{
      return this._entityMaker.makeBlob(defn);
    }
    addBox(i){
      return this._entityMaker.makeBox(i);
    }
    addGround(){
      return this._entityMaker.makeGround();
    }
}

export default GameManager;
