import * as BABYLON from 'babylonjs';

import {Object3D, Collisionable, Collider, Recovering, Moving, PulsatingScale, Timeout, PulsatingColor, Colliding, Rotating} from './components.js';
import {RotatingSystem, ColliderSystem, PulsatingColorSystem, PulsatingScaleSystem, MovingSystem,TimeoutSystem} from './systems.js';

function randomSpherePoint(radius) {
    var u = Math.random();
    var v = Math.random();
    var theta = 2 * Math.PI * u;
    var phi = Math.acos(2 * v - 1);
    var x = radius * Math.sin(phi) * Math.cos(theta);
    var y = radius * Math.sin(phi) * Math.sin(theta);
    var z = radius * Math.cos(phi);
    return {x,y,z};
  }


class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.FreeCamera;
    private _light: BABYLON.Light;

    constructor(canvasElement : string) {
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._world = new ECSY.World();
        this._world.systemManager
          .registerSystem(RotatingSystem)
          .registerSystem(PulsatingColorSystem)
          .registerSystem(PulsatingScaleSystem)
          .registerSystem(TimeoutSystem)
          .registerSystem(ColliderSystem)
          .registerSystem(MovingSystem);
    }
    getScene():BABYLON.Scene{
      return this._scene;
    }

    createScene() : void {
        this._scene = new BABYLON.Scene(this._engine);
        this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), this._scene);
        this._camera.setTarget(BABYLON.Vector3.Zero());
        this._camera.attachControl(this._canvas, false);
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this._scene);
        let ground = BABYLON.MeshBuilder.CreateGround('ground1', {width: 6, height: 6, subdivisions: 2}, this._scene);

        let objMoving = BABYLON.MeshBuilder.CreateIcoSphere('sphere',{subdivisions: 1}, this._scene);
        var material = new BABYLON.StandardMaterial();
        material.diffuseColor.set(1,1,0);
        objMoving.material = material;
        var radius = 2;
        var entity = this._world.entityManager.createEntity();
        entity.addComponent(Collider);
        entity.addComponent(Object3D, {object: objMoving});
        entity.addComponent(Rotating, {rotatingSpeed: 0.5});
        objMoving.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, radius), false);

        var rootMesh = BABYLON.MeshBuilder.CreateBox('box',{size: 0.25}, this._scene);
        var material = new BABYLON.StandardMaterial("material", this._scene);
        material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        rootMesh.material = material;
        rootMesh.setEnabled(false);

        for (var i = 0;i < 100; i++) {
          var entity = this._world.entityManager.createEntity();
          var mesh = rootMesh.createInstance('box');
          //mesh.instancedBuffers.color = new BABYLON.Color4(1, 0, 0, 1);
          mesh.alwaysSelectAsActiveMesh = true;
          mesh.position.copyFrom(randomSpherePoint(radius));
          entity.addComponent(Object3D, {object: mesh});
          entity.addComponent(PulsatingColor, {offset: i});
          entity.addComponent(PulsatingScale, {offset: i});
          if (Math.random() > 0.5) {
            entity.addComponent(Moving, {offset: i});
          }
          entity.addComponent(Collisionable);
        }
    }

    doRender() : void {
      let lastTime = 0;
        this._engine.runRenderLoop(() => {
            this._scene.render();
            var time = performance.now() / 1000;
            var delta = time - lastTime;
            lastTime = time;
            this._world.execute(delta, time);
        });

        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}

export default Game;

/**

    var rootMesh = BABYLON.MeshBuilder.CreateBox('box',{size: size}, scene);
    var material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    rootMesh.material = material;
    rootMesh.setEnabled(false);

    rootMesh.registerInstancedBuffer("color", 4);
    rootMesh.instancedBuffers.color = new BABYLON.Color4(1, 0, 0, 1);

    for (var i = 0;i < 10; i++) {
      var entity = this._world.entityManager.createEntity();

      var mesh = rootMesh.createInstance('box');
      mesh.instancedBuffers.color = new BABYLON.Color4(1, 0, 0, 1);
      mesh.alwaysSelectAsActiveMesh = true;
      mesh.position.copyFrom(randomSpherePoint(radius));

      var state = {
        mesh: mesh,
        colliding: false,
        rotationSpeed: 0,
        originalColor: new BABYLON.Color4(1, 0, 0, 1),
        tmpColor: new BABYLON.Color4()
      };

      states.push(state);

      entity.addComponent(Object3D, {object: mesh});
      entity.addComponent(PulsatingColor, {offset: i});
      entity.addComponent(PulsatingScale, {offset: i});

      if (Math.random() > 0.5) {
        entity.addComponent(Moving, {offset: i});
      }

      entity.addComponent(Collisionable);
    }

**/
