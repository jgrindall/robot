import * as BABYLON from 'babylonjs';
import {Object3D} from './components';

class GameEntity {
    private _entity: BABYLON.Mesh;

    constructor(entity) {
        this._entity = entity;
    }
    setPosition(){
      //const mesh = this._entity.getComponent(Object3D).object;
      //mesh.position.x += 0.001;
      //mesh.position.y += 0.001;
    }
    updateProp() : void {

    }
    getMesh():Mesh{
      return this._entity.getComponent(Object3D).object;
    }
    getId(){
      //return this._id;
    }
}

export default GameEntity;
