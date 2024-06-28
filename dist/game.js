import * as THREE from 'three';
import { g_gengine } from "./engine";
// INIT ENGINE
g_gengine.init();
// DEFINE CUSTOME VALUES OF ENGINE
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
g_gengine.add_object(cube);
g_gengine.main_camera.position.z = 5;
function loop() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
g_gengine.start(loop);
//# sourceMappingURL=game.js.map