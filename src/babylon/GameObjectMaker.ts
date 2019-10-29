import * as BABYLON from 'babylonjs';
import GameObject from './GameObject';
import MeshMaker from './MeshMaker';

class GameObjectMaker {
    private _meshMaker:MeshMaker;
    private _scene:BABYLON.Scene;
    constructor(meshMaker:MeshMaker, scene:BABYLON.Scene){
      this._meshMaker = meshMaker;
      this._scene = scene;
    }
    make(props:string) : GameObject{
        const id = "1234" + Math.random();
        const mesh = this._meshMaker.make("name" + id);
        return new GameObject(id, mesh);
    }
}

export default GameObjectMaker;
