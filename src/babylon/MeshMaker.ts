import * as BABYLON from 'babylonjs';
import assets from '../assets/*.*');
import numbers from '../assets/numbers.jpg';
console.log(assets, numbers);

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
    makePig(name){
      var mat = new BABYLON.StandardMaterial("pig", this._scene);
      var texture = new BABYLON.Texture(numbers, this._scene);
      mat.diffuseTexture = texture;
      var columns = 6;
      var rows = 1;
      var faceUV = new Array(6);
      for (var i = 0; i < 6; i++) {
          faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
      }
      var options = {
          faceUV: faceUV,
          wrap: true
      };
      var mesh = BABYLON.MeshBuilder.CreateBox('box', options, this._scene);
      mesh.material = mat;
      return mesh;
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
