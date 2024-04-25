import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Scene {
  private scene = new THREE.Scene();
  private camera?: THREE.PerspectiveCamera;
  private renderer?: THREE.WebGLRenderer;

  constructor(container: HTMLDivElement, canvas: HTMLCanvasElement) {
    this.init(container, canvas);
  }

  addHelpers(): void {
    const axesHelper = new THREE.AxesHelper(3);
    this.scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(10, 10);
    this.scene.add(gridHelper);
  }

  addBox(): THREE.Mesh {
    const boxGeometry = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);

    this.scene.add(box);

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

    this.scene.add(plane);

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

    this.scene.add(sphere);

    return sphere;
  }

  updateSceneSize(container: HTMLDivElement): void {
    if (!this.camera) return;

    this.camera.aspect = container.offsetWidth / container.offsetHeight;
    this.camera.updateProjectionMatrix();

    if (!this.renderer) return;

    this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    this.renderer.render(this.scene, this.camera);
  }

  private init(container: HTMLDivElement, canvas: HTMLCanvasElement): void {
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);

    this.camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.001,
      1000,
    );

    const orbit = new OrbitControls(this.camera, this.renderer.domElement);

    this.camera.position.set(1, 2, 5);
    orbit.update();

    this.renderer.setAnimationLoop(() => {
      if (!this.renderer || !this.camera) return;

      this.renderer.render(this.scene, this.camera);
    });
  }
}
