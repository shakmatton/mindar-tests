// Try this exercise again in the future, but using Draco Compression in Blender first...



import {loadGLTF} from "./loader.js"

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './lowpolywell.mind',
    });
    const {renderer, scene, camera} = mindarThree;
    
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
    scene.add(light)

    const well = await loadGLTF("./lowpoly-well/scene.gltf")                   
    
    well.scene.scale.set(0.1, 0.1, 0.1)       // lowpolywell configs  
    well.scene.position.set(0, -0.2, -6)
    well.scene.rotation.set(3.4, 1.8, 0)

    const wellAnchor = mindarThree.addAnchor(0)        
    wellAnchor.group.add(well.scene)            

    /* ================ GLTF animations ================ */

    const wellMixer = new THREE.AnimationMixer(well.scene)
    
    // const wellAction = wellMixer.clipAction (well.animations[0])       // These lines are about the model's embedded animation.
    // wellAction.play()                                                  // Since we have no native animations embedded in it, we'll just comment them.
                                                                          // We'll create our custom animation later, inside renderer.setAnimationLoop().


    const clock = new THREE.Clock()          // gets the current time, in order to calculate delta time inside the AnimationLoop (below).
    
    await mindarThree.start();

    renderer.setAnimationLoop(() => {

      const delta = clock.getDelta()        // gets the calculated time span      
    
      well.scene.rotation.set(0.5, well.scene.rotation.y + delta, 0)                  // you can play with the values to get the desired position 

      wellMixer.update(delta)

      renderer.render(scene, camera);
    });
  }
  start();
});

