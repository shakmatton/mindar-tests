// This lesson starts from the 211-multi-detect base code.
// In that lesson, we could load either the Raccoon or the Bear. In the following lesson (212-multi-track), we learned how to show both at the same time on screen. 
// Now we'll just add the animation for when the racoon OR the bear appears (you can try to do both animations in the future, based on lesson 212 too).

// NOTICE THE ORIGINAL TUTORIAL CODE SHOWS ONLY THE RACCOON EXAMPLE. 
// WE DECIDED TO GO A LITTLE FURTHER, ADAPTING THE TUTORIAL TO SHOW ANIMATIONS FOR THE RACCOON AND THE BEAR (ONE AT A TIME)!

// For this lesson, we deal with 2 types of animation: 
// the ones embedded within the animation itself; and the ones we can add to the model (like spinning, fading etc).



import {loadGLTF} from "./loader.js"

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './targets.mind',
    });
    const {renderer, scene, camera} = mindarThree;
    
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
    scene.add(light)

    const raccoon = await loadGLTF("./musicband-raccoon/scene.gltf")             // our raccoon gltf scene, containing an embedded raccoon animation 
    raccoon.scene.scale.set(0.1, 0.1, 0.1)
    raccoon.scene.position.set(0, -0.4, 0)

    const bear = await loadGLTF("./musicband-bear/scene.gltf")                   // our raccoon gltf scene, containing an embedded raccoon animation 
    bear.scene.scale.set(0.1, 0.1, 0.1)
    bear.scene.position.set(0, -0.4, 0)

    const raccoonAnchor = mindarThree.addAnchor(0)                               // our raccoon anchor points, which will be added to our raccoon scene. The raccoonAnchor is added to position[0].
    raccoonAnchor.group.add(raccoon.scene)            

    const bearAnchor = mindarThree.addAnchor(1)                                  // our bear anchor points, which will be added to our bear scene. The bearAnchor is added to position[1].
    bearAnchor.group.add(bear.scene)

    /* ================ GLTF animations ================ */

    const raccoonMixer = new THREE.AnimationMixer(raccoon.scene)                 // an animation mixer for our raccoon, passing 'raccoon.scene' as a parameter.
    const bearMixer = new THREE.AnimationMixer(bear.scene)                       // an animation mixer for our bear, passing 'bear.scene' as a parameter.
    
    // Instantiating 'raccoonAction' or 'bearAction' as clipping animation mixers. Each object has its own list of animations stored in position arrays. 
    // We only have one animation for the bear and one for the raccoon. So, we can just use the array position[0] for each one of them.

    const raccoonAction = raccoonMixer.clipAction (raccoon.animations[0])        
    const bearAction = bearMixer.clipAction (bear.animations[0])                 

    raccoonAction.play()                                                         // plays the raccoon animation, if it is shown.     
    bearAction.play()                                                            // plays the bear animation, if it is shown.

    const clock = new THREE.Clock()          // gets the current time, in order to calculate delta time inside the AnimationLoop (below).
    
    await mindarThree.start();

    renderer.setAnimationLoop(() => {

      const delta = clock.getDelta()        // gets the calculated time span
      
      // Below, we make our raccoon/bear animations to spin along the Y Axis.
      raccoon.scene.rotation.set(0, raccoon.scene.rotation.y + delta, 0)               
      bear.scene.rotation.set(0, bear.scene.rotation.y + delta, 0)
      
      // Finally, the scene animation of either the raccoon or the bear is updated with the calculated delta time span.
      raccoonMixer.update(delta)                   
      bearMixer.update(delta)

      renderer.render(scene, camera);
    });
  }
  start();
});

