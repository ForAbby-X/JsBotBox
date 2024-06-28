var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
//	####################
//	## INITIALISATION ##
//	####################
function engine_init() {
    this.renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance",
        antialias: true
    });
    this.scene = new THREE.Scene();
    this.main_camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.model_loader = new GLTFLoader();
    this.running = false;
    this.model_array = {};
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.scene.background = new THREE.Color(0x6d8781);
    return true;
}
function engine_start(loop_func) {
    this.running = true;
    this.loop_func = loop_func;
    this.renderer.setAnimationLoop(engine_anim.bind(this));
    return true;
}
function engine_anim() {
    this.renderer.setAnimationLoop(engine_anim.bind(this));
    this.loop_func();
    this.renderer.render(this.scene, this.main_camera);
}
//	###############
//	## UTILITIES ##
//	###############
function findMesh(entireObj, keyToFind, valToFind) {
    var foundObj;
    JSON.stringify(entireObj, function (_, nestedValue) {
        if (nestedValue && nestedValue[keyToFind] === valToFind) {
            foundObj = nestedValue;
        }
        return nestedValue;
    });
    return foundObj;
}
;
function engine_load_gltf(model_path, model_name) {
    return __awaiter(this, void 0, void 0, function () {
        var obj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.model_loader.loadAsync(model_path, function (gltf) {
                        console.log(gltf);
                        return gltf;
                    }, undefined, function (error) {
                        console.error(error);
                    })];
                case 1:
                    obj = _a.sent();
                    this.model_array[model_name] = findMesh(obj.scene, 'type', 'Mesh');
                    return [2 /*return*/, this.model_array[model_name]];
            }
        });
    });
}
function engine_add_object(object) {
    this.scene.add(object);
    return object;
}
function engine_rem_object(object) {
    if (object && object.parent)
        object.parent.remove(object);
    return object;
}
//	######################
//	## CLASS DEFINITION ##
//	######################
var Gengine = /** @class */ (function () {
    function Gengine() {
        this.loop_func = function () { };
        // # methods
        this.init = engine_init.bind(this);
        this.start = engine_start.bind(this);
        this.load_gltf = engine_load_gltf.bind(this);
        this.add_object = engine_add_object.bind(this);
        this.rem_object = engine_rem_object.bind(this);
    }
    return Gengine;
}());
export { Gengine };
//# sourceMappingURL=engine.js.map