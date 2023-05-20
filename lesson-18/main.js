// This exercise is just a demonstration of the creation of a custom UI.
// So, if you want display the AR raccoon image, just check the previous lessons. 

// Check the 'index.html' file also.

const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF} from "./loader.js"

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.querySelector("#container"),
      imageTargetSrc: './musicband.mind',
      uiScanning: "#scanning",                      // Enables a custom UI. Also, if you just set it to "no", it will disable the standard UI searching effect. 
                                                    // MindAR modifies the class of this element during the app lifecycle.
                                                    // When the app is locked in a scanning state, it will add an class 'hidden' to the elements.
                                                    // And when the app is out of that scanning state, it will remove that class.
                                                    
                                                    // Go to 'index.html' and check the custom scanning element added.


      uiLoading: "no"                               // Disables the UI Loading circle effect.
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
