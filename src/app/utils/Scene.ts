import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Scene {
  private _scene = new THREE.Scene();
  private _camera?: THREE.PerspectiveCamera;
  private _renderer?: THREE.WebGLRenderer;

  constructor(
    container: HTMLDivElement,
    private _canvas: HTMLCanvasElement,
  ) {
    this.init(container, _canvas);
  }

  addHelpers(): void {
    const axesHelper = new THREE.AxesHelper(3);
    this._scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(10, 10);
    this._scene.add(gridHelper);
  }

  addBox(): THREE.Mesh {
    const boxGeometry = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);

    this._scene.add(box);

    return box;
  }

  addPlane(): THREE.Mesh {
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = Math.PI / 2;

    this._scene.add(plane);

    return plane;
  }

  addSphere(): THREE.Mesh {
    const sphereGeometry = new THREE.SphereGeometry(1, 50, 50);
    const sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: false,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.position.set(0, 2, 0);

    this._scene.add(sphere);

    return sphere;
  }

  updateSceneSize(container: HTMLDivElement): void {
    this._canvas.style.setProperty('width', '0');
    this._canvas.style.setProperty('height', '0');

    if (!this._camera) return;

    this._camera.aspect = container.offsetWidth / container.offsetHeight;
    this._camera.updateProjectionMatrix();

    if (!this._renderer) return;

    this._renderer.setSize(container.offsetWidth, container.offsetHeight);
    this._renderer.render(this._scene, this._camera);
  }

  private init(container: HTMLDivElement, canvas: HTMLCanvasElement): void {
    this._renderer = new THREE.WebGLRenderer({ canvas });
    this._renderer.setSize(container.offsetWidth, container.offsetHeight);

    this._camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.001,
      1000,
    );

    const orbit = new OrbitControls(this._camera, this._renderer.domElement);

    this._camera.position.set(1, 2, 5);
    orbit.update();

    this._renderer.setAnimationLoop(() => {
      if (!this._renderer || !this._camera) return;

      this._renderer.render(this._scene, this._camera);
    });
  }
}
