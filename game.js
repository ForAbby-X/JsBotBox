import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


engine_init()
{
	this.scene = 
}


var gengine = {
	renderer		: new THREE.WebGLRenderer({ antialias: true }),
	scene			: new THREE.Scene(),
	main_camera		: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
	model_loader	: new GLTFLoader(),

	init			: function() {},
	start			: function() {},


}