import GameEntityMaker from './GameEntityMaker';
import GameEntity from './GameEntity';
import _ from 'underscore';

class GameManager {
    private _entityMaker:GameEntityMaker
    private _entities = []

    constructor(entityMaker:GameEntityMaker) {
      this._entityMaker = entityMaker;
    }
    addPig(defn){
      const e = this._entityMaker.makePig(defn);
      this._entities.push(e);
      return e;
    }
    addBlob(defn:string):GameEntity{
      const e = this._entityMaker.makeBlob(defn);
      this._entities.push(e);
      return e;
    }
    addBox(i){
      const e = this._entityMaker.makeBox(i);
      this._entities.push(e);
      return e;
    }
    addGround(){
      const e = this._entityMaker.makeGround();
      this._entities.push(e);
      return e;
    }
    destroyAll(){
      while(this._entities.length >= 1){
        const en = this._entities.pop();
        en.remove();
      }
    }
}

export default GameManager;
