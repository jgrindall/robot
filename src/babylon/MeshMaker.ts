import * as BABYLON from 'babylonjs';

class MeshMaker {
    private _scene:BABYLON.Scene;
    private _rootMesh;
    constructor(scene:BABYLON.Scene){
      this._scene = scene;
    }
    makeSphere(name:string, props:stringe) : BABYLON.Mesh{
        return BABYLON.MeshBuilder.CreateSphere(name, {segments: 16, diameter: 2}, this._scene);
    }
    makeIso(name):BABYLON.Mesh{
      let mesh = BABYLON.MeshBuilder.CreateIcoSphere(name,{subdivisions: 1}, this._scene);
      var material = new BABYLON.StandardMaterial();
      material.diffuseColor.set(1,1,0);
      mesh.material = material;
      mesh.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 2), false);
      return mesh;
    }
    makeGround(name):BABYLON.Mesh{
      return BABYLON.MeshBuilder.CreateGround(name, {width: 6, height: 6, subdivisions: 2}, this._scene);
    }
    makeBox(name){
      if(!this._rootMesh){
        this._rootMesh = BABYLON.MeshBuilder.CreateBox('box',{size: 0.25}, this._scene);
      }
      const material = new BABYLON.StandardMaterial("material", this._scene);
      material.diffuseColor = new BABYLON.Color3(1, 1, 1);
      this._rootMesh.material = material;
      this._rootMesh.setEnabled(false);
      const mesh = this._rootMesh.createInstance('box');
      mesh.alwaysSelectAsActiveMesh = true;
      return mesh;
    }
}

export default MeshMaker;
