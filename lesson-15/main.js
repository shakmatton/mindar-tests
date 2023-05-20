/* 
For this lesson, check also the 'index.html' file.
We also must manually import our CSS3DObject library, since it doesn't belong to the THREE.js core API.

*/

import {CSS3DObject} from "./CSS3DRenderer.js"

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './course-banner.mind',
    });
    
    
    // MindAR is capable of creating aditional types of renderers and scenes. We'll use that property to creating our 'cssRenderer' and our 'cssScene'.
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

    // We can use CSS3DRenderer to wrap up an HTML element and turn it into a Three.js object.
    const obj = new CSS3DObject(document.querySelector("#ar-div")) 

    // Now, we create an cssAnchor for our mindarThree. 
    // ATTENTION! Instead of using 'addAnchor', we'll use 'addCSSAnchor' !
    const cssAnchor = mindarThree.addCSSAnchor(0)

    // We'll add an 'obj' to the cssAnchor group.
    cssAnchor.group.add(obj)
    
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      // renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);         // Pay attention here: we want to use our cssRenderer and our cssScene!
    });
  }
  start();
});
