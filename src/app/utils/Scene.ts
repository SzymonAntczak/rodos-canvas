import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Scene {
  private _scene = new THREE.Scene();
  private _camera?: THREE.OrthographicCamera;
  private _renderer?: THREE.WebGLRenderer;

  constructor(
    container: HTMLDivElement,
    private _canvas: HTMLCanvasElement,
  ) {
    this.init(container, _canvas);
  }

  addHelpers(): void {
    const axesHelper = new THREE.AxesHelper(500);
    this._scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(500, 50);
    this._scene.add(gridHelper);
  }

  addBox(): THREE.Mesh {
    const boxGeometry = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);

    this._scene.add(box);

    return box;
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
    console.log(container);
    // this._canvas.style.setProperty('width', '0');
    // this._canvas.style.setProperty('height', '0');

    // if (!this._camera) return;

    // this._camera.aspect = container.offsetWidth / container.offsetHeight;
    // this._camera.updateProjectionMatrix();

    // if (!this._renderer) return;

    // this._renderer.setSize(container.offsetWidth, container.offsetHeight);
    // this._renderer.render(this._scene, this._camera);
  }

  private init(container: HTMLDivElement, canvas: HTMLCanvasElement): void {
    this._renderer = new THREE.WebGLRenderer({ canvas });
    this._renderer.setSize(container.offsetWidth, container.offsetHeight);

    this._camera = new THREE.OrthographicCamera(
      container.offsetWidth / -2,
      container.offsetWidth / 2,
      container.offsetHeight / 2,
      container.offsetHeight / -2,
    );

    const controls = new OrbitControls(this._camera, this._renderer.domElement);
    controls.enableRotate = false;
    controls.minZoom = 1;
    controls.maxZoom = 2;

    controls.addEventListener('change', () => {
      console.log(this._camera?.zoom);
    });

    this._camera.position.set(0, 2000, 0);
    controls.update();

    // this.addPlane();

    this._renderer.setAnimationLoop(() => {
      if (!this._renderer || !this._camera) return;

      controls.update();
      this._renderer.render(this._scene, this._camera);
    });
  }

  private addPlane(): THREE.Mesh {
    const planeGeometry = new THREE.PlaneGeometry(500, 500);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = Math.PI / 2;

    this._scene.add(plane);

    return plane;
  }
}
