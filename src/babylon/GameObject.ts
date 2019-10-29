import * as BABYLON from 'babylonjs';

class GameObject {
    private _scene: BABYLON.Scene;
    private _mesh: BABYLON.Mesh;
    private _id: string;

    constructor(id: string, mesh:BABYLON.Mesh, scene:BABYLON.Scene) {
        this._id = id;
        this._scene = scene;
        this._mesh = mesh;
    }
    setPosition(){
      this._mesh.position.x += 0.001;
      this._mesh.position.y += 0.001;
    }
    updateProp() : void {

    }
    cache() : void{

    }
    getMesh():Mesh{
      return this._mesh;
    }
    getId():string{
      return this._id;
    }
}

export default GameObject;
