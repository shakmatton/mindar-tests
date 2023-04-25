// This lesson is better displayed on Brave browser (Firefox is not so bad, but Chrome doesn't work)...


/* To import models, we'll use the GTFL Loader. 
Since it doesn't belong to ThreeJS core nor MindAR, we need to import it here. */
// import {GLTFLoader} from "./GLTFLoader.js"

/* NOTICE: For this lesson, you have to add and tweak some files:

1) Add 'mindar-image-three.prod.js and 'three.module.js.
2) Open GTLFLoader.js and change path of the import section:
import {...} from './three.module.js';
3) Add the 'musicband-raccoon' folder, which contains all files needed to run the application.
4) In main.js, fix path of scene.gltf, which is inside the 'musicband-raccoon' folder.

5) There is a Warning showing up in the browser Console:
"WARNING: Multiple instances of Three.js being imported."
Maybe Three.js is being imported from 2 different sources simultaneously.
This issue might be worth checking out in the future.

6) There are different ways of building the code for thsi application.
The author shows the basic way (CODE VERSION #1), suitable for when you have one object displaying in your scene.
In the future lessons, the author will use 'Promises' (CODE VERSION #2), which will help organize and improve our code. 
He also shows a quicker way (CODE VERSION #3) by replacing parts of the code by a single import (created by himself). 

*/

/* =============== (CODE VERSION #1) =============== 

import {GLTFLoader} from "./GLTFLoader.js"
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './musicband.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    // Let's add some light to avoid dark rendering:
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
    scene.add(light)

    const anchor = mindarThree.addAnchor(0);

    const loader = new GLTFLoader()
    loader.load("./musicband-raccoon/scene.gltf", (gltf) => {
      // gltf.scene: THREE.Group
       
      // 3D models from the internet might have incorrect position or scale by default.
      // So, we must change them by trial and error (see below):

      gltf.scene.scale.set(0.1, 0.1, 0.1)
      gltf.scene.position.set(0, -0.4, 0)

      anchor.group.add(gltf.scene)
    })

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});

*/


/* =============== (CODE VERSION #2) =============== 

import {GLTFLoader} from "./GLTFLoader.js"
const THREE = window.MINDAR.IMAGE.THREE;

// ---- HERE IS THE 'PROMISE' CHUNK OF CODE ----

const loadGLTF = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.load(path, (gltf) => {
      resolve(gltf)
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './musicband.mind',
    });
    const {renderer, scene, camera} = mindarThree;
    
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
    scene.add(light)

    const anchor = mindarThree.addAnchor(0);


    // ---- HERE IS THE 'AWAIT' CHUNK OF CODE ----
    const gltf = await loadGLTF("./musicband-raccoon/scene.gltf")


    gltf.scene.scale.set(0.1, 0.1, 0.1)
    gltf.scene.position.set(0, -0.4, 0)
    anchor.group.add(gltf.scene)


    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});

*/




// =============== (CODE VERSION #3) ===============    
// This code version is giving 2 Warnings... "WARNING: Multiple instances of Three.js being imported."
// Anyway, the application is working! Better follow the course along, and try to find out the answer later...



// We can remove this now -->    import {GLTFLoader} from "./GLTFLoader.js"

const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF} from "./loader.js"
// ---- The 'Promise' chunk (in CODE VERSION #2) is removed and replaced by an 'IMPORT' (see above) ----


document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      // imageTargetSrc: './musicband.mind',
      imageTargetSrc: './lowpolywell.mind'
    });
    const {renderer, scene, camera} = mindarThree;
    
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
    scene.add(light)

    const anchor = mindarThree.addAnchor(0);
    
    // const gltf = await loadGLTF("./musicband-raccoon/scene.gltf")
    const gltf = await loadGLTF("./lowpoly-well/scene.gltf")

    // gltf.scene.scale.set(0.1, 0.1, 0.1)    // musicband configs
    // gltf.scene.position.set(0, -0.4, 0)

    gltf.scene.scale.set(0.1, 0.1, 0.1)       // lowpolywell configs  
    gltf.scene.position.set(0, 0, -6)
    gltf.scene.rotation.set(0.4, 1.8, 0)

    anchor.group.add(gltf.scene)

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});

