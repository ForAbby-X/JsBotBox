import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

//	####################
//	## INITIALISATION ##
//	####################

function engine_init()
{
	this.renderer		= new THREE.WebGLRenderer({
		powerPreference: "high-performance",
		antialias: true});
	this.scene			= new THREE.Scene();
	this.main_camera	= new THREE.PerspectiveCamera(
		75, window.innerWidth / window.innerHeight,
		0.1, 1000);
	this.model_loader	= new GLTFLoader();
	this.running		= false;
	this.model_array	= {};


	this.renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(this.renderer.domElement);

	this.scene.background = new THREE.Color(0x6d8781);

	return true;
}

function engine_start(loop_func: Function)
{
	this.running = true;

	this.loop_func = loop_func;
	this.renderer.setAnimationLoop(engine_anim.bind(this));

	return true;
}

function engine_anim()
{
	this.renderer.setAnimationLoop(engine_anim.bind(this));
	
	this.loop_func();
	this.renderer.render(this.scene, this.main_camera);
	
}

//	###############
//	## UTILITIES ##
//	###############

function findMesh(entireObj: any, keyToFind: any, valToFind: any) {
	let foundObj;
	JSON.stringify(entireObj, (_, nestedValue) => {
	  if (nestedValue && nestedValue[keyToFind] === valToFind) {
		foundObj = nestedValue;
	  }
	  return nestedValue;
	});
	return foundObj;
  };
  

async function engine_load_gltf(model_path: string, model_name: string)
{
	var obj = await this.model_loader.loadAsync(model_path, function (gltf: any) {
		console.log(gltf);
		return gltf;
	}, undefined, function (error: any) {
		console.error(error);
	});
	this.model_array[model_name] = findMesh(obj.scene, 'type', 'Mesh');
	return this.model_array[model_name];
}

function engine_add_object(object: THREE.Object3D)
{
	this.scene.add(object);
	return object;
}

function engine_rem_object(object: THREE.Object3D)
{
	if (object && object.parent)
		object.parent.remove(object);
	return object;
}

//	######################
//	## CLASS DEFINITION ##
//	######################

class Gengine
{
	// # variables
	renderer!			: THREE.WebGLRenderer;
	scene!				: THREE.Scene;
	main_camera!		: THREE.PerspectiveCamera | THREE.OrthographicCamera;
	model_loader!		: GLTFLoader;
	running!			: boolean;
	model_array!		: { [key: string]: THREE.Mesh };
	loop_func			: Function = function() {};

	// # methods
	init				= engine_init.bind(this);
	start				= engine_start.bind(this);

	load_gltf			= engine_load_gltf.bind(this);

	add_object			= engine_add_object.bind(this);
	rem_object			= engine_rem_object.bind(this);
}

export { Gengine };
