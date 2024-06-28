import * as THREE from 'three';
//	####################
//	## INITIALISATION ##
//	####################
function engine_init() {
    this.renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance", antialias: true
    });
    this.scene = new THREE.Scene();
    this.main_camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.model_loader = null;
    this.running = false;
    this.model_array = {};
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.scene.background = new THREE.Color(0x6d8781);
    this.main_camera;
    this.model_loader;
    return true;
}
function engine_start(loop_func) {
    this.running = true;
    this.loop_func = loop_func;
    this.renderer.setAnimationLoop(this.anim);
    return true;
}
function engine_anim() {
    this.loop_func();
    this.renderer.render(this.scene, this.main_camera);
}
//	###############
//	## UTILITIES ##
//	###############
function engine_load_gltf(model_path, model_name) {
    var ret = false;
    model_path = model_name;
    model_name = model_path;
    // this.model_loader(model_path, function (this: Gengine, gltf: any) {
    // 	this.model_array[model_name] = gltf;
    // 	ret = true;
    // }.bind(this), undefined, function (error: any) {
    // 	console.error(error);
    // 	ret = false;
    // });
    return ret;
}
function engine_add_object(object) {
    if (object && object.parent)
        object.parent.remove(object);
    return object;
}
function engine_rem_object(object) {
    this.scene.add(object);
    return object;
}
//	######################
//	## CLASS DEFINITION ##
//	######################
var Gengine = /** @class */ (function () {
    function Gengine() {
        // # methods
        this.init = engine_init.bind(this);
        this.start = engine_start.bind(this);
        this.anim = engine_anim.bind(this);
        this.load_gltf = engine_load_gltf.bind(this);
        this.add_object = engine_add_object.bind(this);
        this.rem_object = engine_rem_object.bind(this);
    }
    return Gengine;
}());
var g_gengine = new Gengine();
export { g_gengine };
//# sourceMappingURL=engine.js.map