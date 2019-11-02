import * as BABYLON from 'babylonjs';

import {Object3D, Collisionable, Collider, Recovering, Moving, PulsatingScale, Timeout, PulsatingColor, Colliding, Rotating} from './components.js';
import {RotatingSystem, ColliderSystem, PulsatingColorSystem, PulsatingScaleSystem, MovingSystem,TimeoutSystem} from './systems.js';

class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.FreeCamera;
    private _light: BABYLON.Light;

    constructor(canvasElement : string) {
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);

        console.log(ECSY, ECSY.World);

        this._world = new ECSY.World();

        console.log(RotatingSystem);

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





      var camera, scene, renderer, parent;
	var mesh;

  init();

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

  var objMoving, states;
	function init() {
    var numObjects = 10000;
    var size = 0.2;
    var w = 100;

    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

    scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5,-20), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    objMoving = BABYLON.MeshBuilder.CreateIcoSphere('sphere',{subdivisions: 1}, scene);
    var material = new BABYLON.StandardMaterial();
    material.diffuseColor.set(1,1,0);
    objMoving.material = material;

    var radius = 10;
    var entity = world.entityManager.createEntity();
    entity.addComponent(Collider);
    entity.addComponent(Object3D, {object: objMoving});
    entity.addComponent(Rotating, {rotatingSpeed: 0.5});
    objMoving.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, radius), false);

    states = [];

    var rootMesh = BABYLON.MeshBuilder.CreateBox('box',{size: size}, scene);
    var material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    rootMesh.material = material;
    rootMesh.setEnabled(false);

    rootMesh.registerInstancedBuffer("color", 4);
    rootMesh.instancedBuffers.color = new BABYLON.Color4(1, 0, 0, 1);

    for (var i = 0;i < numObjects; i++) {
      var entity = world.entityManager.createEntity();

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

    scene.freezeActiveMeshes();

    window.addEventListener( 'resize', () => engine.resize());
    var lastTime = performance.now();
    engine.runRenderLoop(function() {
      var time = performance.now() / 1000;
      var delta = time-lastTime;
      lastTime = time;
      scene.render();

      world.execute(delta, time);
    });
	}


**/
