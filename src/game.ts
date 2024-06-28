
import * as THREE from 'three';
import { Gengine } from "./engine";
import { randFloat } from 'three/src/math/MathUtils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// DEFINE CUSTOME VALUES OF ENGINE
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x008e00, wireframe: true });

class Game {
	engine: Gengine;
	control: OrbitControls;

	constructor() {
		this.engine = new Gengine();
		this.engine.init();

		this.init_start();

		this.engine.start(this.loop.bind(this));
	}

	async init_start() {

		// # Control
		this.control = new OrbitControls(this.engine.main_camera, this.engine.renderer.domElement);
		this.control.update();

		// # Lights
		var light = new THREE.DirectionalLight(0xffffff, 0.4);
		light.position.set(0, 0, 5);
		this.engine.scene.add(light);

		light = new THREE.DirectionalLight(0x00ffff, 0.4);
		light.position.set(2, 0, -5);
		this.engine.scene.add(light);

		light = new THREE.DirectionalLight(0xffff00, 0.4);
		light.position.set(-2, -5, 2);
		this.engine.scene.add(light);

		// # Camera
		this.engine.main_camera.position.z = 5;

		// # Entities
		var cube = new THREE.Mesh(geometry, material);
		cube.rotateX(randFloat(0, 2 * Math.PI));
		this.engine.add_object(cube);

		cube = new THREE.Mesh(geometry, material);
		cube.rotateX(randFloat(0, 2 * Math.PI));
		this.engine.add_object(cube);

		cube = new THREE.Mesh(geometry, material);
		cube.rotateX(randFloat(0, 2 * Math.PI));
		this.engine.add_object(cube);

		cube = new THREE.Mesh(geometry, material);
		cube.rotateX(randFloat(0, 2 * Math.PI));
		this.engine.add_object(cube);

		cube = new THREE.Mesh(geometry, material);
		cube.rotateX(randFloat(0, 2 * Math.PI));
		this.engine.add_object(cube);

		var fly_mesh: THREE.Mesh = await this.engine.load_gltf('models/fly/scene.gltf', 'fly');
		console.log(fly_mesh);
		fly_mesh.material = new THREE.MeshLambertMaterial({color: 0x33cc33, side: THREE.DoubleSide, emissive: 0xff0033, opacity: 0.4, transparent: true});
		this.engine.scene.add(fly_mesh);
	}

	loop() {
		// console.log(this.engine.scene.children.length);

		// for (let i = 0; i < this.engine.scene.children.length; i++) {
		// 	const obj = this.engine.scene.children[i];
		// 	obj.rotation.x += 0.01;
		// 	obj.rotation.y += 0.01;
		// }
	}
}


const game = new Game();
