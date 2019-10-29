import * as BABYLON from 'babylonjs';

class MeshMaker {
  private _scene:BABYLON.Scene;
  constructor(scene:BABYLON.Scene){
    this._scene = scene;
  }

    make(name:string, props:stringe) : BABYLON.Mesh{
        return BABYLON.MeshBuilder.CreateSphere(name, {segments: 16, diameter: 2}, this._scene);
    }
}

export default MeshMaker;
