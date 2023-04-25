import {mockWithVideo} from './camera-mock.js';

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    mockWithVideo('./course-banner1.mp4');

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      // container: document.body,
      container: document.querySelector("#my-ar-container"),     // accessing our customized container here 
      imageTargetSrc: './course-banner.mind'
    });
    const {renderer, scene, camera} = mindarThree;

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.5});
    const plane = new THREE.Mesh(geometry, material);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
