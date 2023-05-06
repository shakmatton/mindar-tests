// TO MAKE THE USER INTERACTION WORK, CLICK ON THE RACOON DRUM SET. YOU SHALL HEAR A VOICE SAYING "DRUM SET!".

/* Lesson details:

1 - Three.js objects are just virtual elements inside the canvas. They are not DOM elements by themselves. 
    So, to capture our user interaction click event, we need to capture this event on a canvas container, and then, do some calculations with the position ourselves.
    In this case, our canvas container is our "document.body". We'll create a callback event using "document.body.eventListener()". See it further below in the code.

2 - 3D Scenes are usually constructed in hierarchy. For instance, there is a hierarchy between the anchor and the racoon, or the racoon and its child object elements. 
    We'll use that later to check intersections of user action (a click on a screen) and a list of possible intercepted objects of the scene.

*/


import {loadGLTF, loadAudio} from "./loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './musicband.mind',
    });

    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const raccoon = await loadGLTF('./musicband-raccoon/scene.gltf');
    
    raccoon.scene.scale.set(0.1, 0.1, 0.1);
    raccoon.scene.position.set(0, -0.4, 0);
    

    // This variable is about the user action of clicking or touching a screen. In this case, it is set to true.
    raccoon.scene.userData.clickable = true;          // We'll do this to all models which we want to capture an event (like the event 'click', further below).


    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(raccoon.scene);

    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audioClip = await loadAudio("./musicband-drum-set.mp3");
    const audio = new THREE.Audio(listener);
    audio.setBuffer(audioClip);


    // The event listener below will process the mouse position, raycast, intersections and userData.clickable.
    document.body.addEventListener("click", (e) => {              

      // We get the mouse coordinates position and normalize the range, from [0 ; 1] to [-1 ; 1].
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -1 * ((e.clientY / window.innerHeight) * 2 - 1);  
      // In a DOM coordinate system, Y axis goes from top to bottom. But, in Canvas, it goes from bottom to top. Therefore, we reverse the Y coord (multiplying it by 1).

      // Storing the mouse info in a Vector2 array:
      const mouse = new THREE.Vector2(mouseX, mouseY);

      // Now, we use the Raycaster method for checking intersections with elements displayed:
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      // The intersect object gets the intersection of the raycast to all scene children elements (instead of just the racoon.scene). This generates a list of intersects.
      const intersects = raycaster.intersectObjects(scene.children, true);         // "True" means the object will look up for all objects recursively in the hierarchy.

      if (intersects.length > 0) {                      // If the number of intersections is not null, then:

        let o = intersects[0].object;   {               // We analyze one (o)bject of the instersects array. Those objects have parent elements that follows a hierarchy. 
                
        while (o.parent && !o.userData.clickable)       // While user has not clicked the screen... 
          o = o.parent;                                   // ... search a parent element. 
        }

        if (o.userData.clickable) {                     // If user has clicked the screen... 
          if (o === raccoon.scene) {                       // and, in case the clicked object happens to be the racoon.scene...
            audio.play();                                      // ... we play the corresponding racoon audio!
          }
        }
      }
    });

    await mindarThree.start();
    
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  
  start();

});
