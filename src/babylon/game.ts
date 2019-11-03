import * as BABYLON from 'babylonjs';
import {Object3D, Collisionable, Collider, Recovering, Moving, PulsatingScale, Timeout, Colliding, Rotating} from './components.js';
import {RotatingSystem, ColliderSystem, PulsatingScaleSystem, MovingSystem,TimeoutSystem} from './systems.js';

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
          .registerSystem(PulsatingScaleSystem)
          .registerSystem(TimeoutSystem)
          .registerSystem(ColliderSystem)
          .registerSystem(MovingSystem);
    }
    getScene():BABYLON.Scene{
      return this._scene;
    }
    getWorld():ECSY.World{
      return this._world;
    }
    createEntity(){
      return this._world.entityManager.createEntity();
    }

    createScene() : void {
        this._scene = new BABYLON.Scene(this._engine);
        this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-15), this._scene);
        this._camera.setTarget(BABYLON.Vector3.Zero());
        this._camera.attachControl(this._canvas, false);
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this._scene);
    }

    doRender() : void {
      let lastTime = performance.now() / 1000;;
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
