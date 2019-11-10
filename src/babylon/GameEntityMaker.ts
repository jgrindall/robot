import * as BABYLON from 'babylonjs';
import GameEntity from './GameEntity';
import MeshMaker from './MeshMaker';
import {Collider, Object3D, Rotating, Moving, PulsatingScale, Collisionable} from './components';


const randomSpherePoint = (radius)=>{
    var u = Math.random();
    var v = Math.random();
    var theta = 2 * Math.PI * u;
    var phi = Math.acos(2 * v - 1);
    var x = radius * Math.sin(phi) * Math.cos(theta);
    var y = radius * Math.sin(phi) * Math.sin(theta);
    var z = radius * Math.cos(phi);
    return {x,y,z};
  };


class GameEntityMaker {
    private _meshMaker:MeshMaker;
    private _world;
    constructor(meshMaker:MeshMaker, world){
      this._meshMaker = meshMaker;
      this._world = world;
    }
    getWorld(){
      return this._world;
    }
    makeGround(){
      const mesh = this._meshMaker.makeGround('ground');
      const entity = this._world.createEntity();
      entity.addComponent(Object3D, {object: mesh});
      return new GameEntity(entity);
    }
    makeBox(i){
      var entity = this._world.createEntity();
      var mesh = this._meshMaker.makeBox();
      mesh.position.copyFrom(randomSpherePoint(4));
      entity.addComponent(Object3D, {object: mesh});
      entity.addComponent(PulsatingScale, {offset: i});
      if (Math.random() > 0.5) {
        //entity.addComponent(Moving, {offset: i});
      }
      //entity.addComponent(Collisionable);
      return new GameEntity(entity);
    }
    makePig(){
      const mesh = this._meshMaker.makePig('pig');
      const entity = this._world.createEntity();
      //entity.addComponent(Collider);
      entity.addComponent(Object3D, {object: mesh});
      return new GameEntity(entity);
    }
    makeBlob(){
      const mesh = this._meshMaker.makeIso('sphere');
      const entity = this._world.createEntity();
      //entity.addComponent(Collider);
      entity.addComponent(Object3D, {object: mesh});
      entity.addComponent(Rotating, {rotatingSpeed: 0.5});
      return new GameEntity(entity);
    }
}

export default GameEntityMaker;
