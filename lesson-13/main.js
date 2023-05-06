import {loadGLTF, loadVideo} from "./loader.js";
import {mockWithVideo} from './camera-mock.js';

import {createChromaMaterial} from './chroma-video.js';           // We import the method "createChromaMaterial", so we can process the green pixels of our future texture. 

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    mockWithVideo('./course-banner1.mp4');
    
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './course-banner.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const video = await loadVideo('./guitar-player.mp4');
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(1, 1080/1920);
    // const material = new THREE.MeshBasicMaterial({map: texture});

    // Instead of the material above, we'll create our custom material. 
    // DON'T FORGET: use our imported method ('createChromaMaterial'), instead of 'new THREE.MeshBasicMaterial'.

    const material = createChromaMaterial(texture, 0x00ff00);     // 1st parameter is a texture; 2nd is our chroma-key (treated here as a TRANSPARENT color).

    const plane = new THREE.Mesh(geometry, material)

    // We don't want to have our video overlayed on the target image, but perpendicular to the it, so the guitarist stands upright on the target.    
    // To do that, let's adjust our plan:
    
    plane.rotation.x = Math.PI / 2         // BEWARE: it is written "Math", not "MATH"!
    plane.position.y = 0.7
    plane.scale.multiplyScalar(4)



    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
