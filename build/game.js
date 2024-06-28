import * as THREE from 'three';
import { g_gengine } from "./engine";
// INIT ENGINE
g_gengine.init();
// DEFINE CUSTOME VALUES OF ENGINE
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
g_gengine.add_object(cube);
g_gengine.main_camera.position.z = 5;
function loop() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
g_gengine.start(loop);
