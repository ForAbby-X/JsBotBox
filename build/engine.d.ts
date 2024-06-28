import * as THREE from 'three';
declare class Gengine {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    main_camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    model_loader: null;
    running: boolean;
    model_array: {
        [key: string]: any;
    };
    loop_func: Function;
    init: () => boolean;
    start: (loop_func: any) => boolean;
    anim: () => void;
    load_gltf: (model_path: string, model_name: string) => boolean;
    add_object: (object: THREE.Object3D<THREE.Object3DEventMap>) => THREE.Object3D<THREE.Object3DEventMap>;
    rem_object: (object: THREE.Object3D<THREE.Object3DEventMap>) => THREE.Object3D<THREE.Object3DEventMap>;
}
declare const g_gengine: Gengine;
export { g_gengine };
