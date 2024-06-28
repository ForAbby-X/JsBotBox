System.register("engine", ["three"], function (exports_1, context_1) {
    "use strict";
    var THREE, Gengine, g_gengine;
    var __moduleName = context_1 && context_1.id;
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
    return {
        setters: [
            function (THREE_1) {
                THREE = THREE_1;
            }
        ],
        execute: function () {
            //	######################
            //	## CLASS DEFINITION ##
            //	######################
            Gengine = /** @class */ (function () {
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
            g_gengine = new Gengine();
            exports_1("g_gengine", g_gengine);
        }
    };
});
System.register("game", ["three", "engine"], function (exports_2, context_2) {
    "use strict";
    var THREE, engine_1, geometry, material, cube;
    var __moduleName = context_2 && context_2.id;
    function loop() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }
    return {
        setters: [
            function (THREE_2) {
                THREE = THREE_2;
            },
            function (engine_1_1) {
                engine_1 = engine_1_1;
            }
        ],
        execute: function () {
            // INIT ENGINE
            engine_1.g_gengine.init();
            // DEFINE CUSTOME VALUES OF ENGINE
            geometry = new THREE.BoxGeometry(1, 1, 1);
            material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            cube = new THREE.Mesh(geometry, material);
            engine_1.g_gengine.add_object(cube);
            engine_1.g_gengine.main_camera.position.z = 5;
            engine_1.g_gengine.start(loop);
        }
    };
});
//# sourceMappingURL=game.js.map