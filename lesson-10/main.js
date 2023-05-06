/* In this lesson, we will use an audio content for our raccoon. We can use a MindAR helper function to aid us loading the audio.
(The author uses Promises instead of Callback methods. Check loader.js 'loadAudio' method for more details). */


import {loadGLTF, loadAudio} from "./loader.js";              // Importing 'loadAudio' here
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

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(raccoon.scene);




    // 1) Here we add our mp3 song file:
    const audioClip = await loadAudio("./musicband-background.mp3")

    // 2) Now, we need a few audio objects:
    const listener = new THREE.AudioListener()
    const audio = new THREE.PositionalAudio(listener)        // PositionalAudio allows us to determine from where the sound comes from!

    // 3) Here we add our listener to the camera. The listener acts like a real ear. 
    // So, the camera can "sense" where the ear is (as well as the sound location and its movement).
    camera.add(listener)    

    // 4) And then, we add our audio object into our AR anchor group.
    // In practice, this creates a distance between the "ears" and the origin of the sound (if the object gets closer, we'll hear it louder).
    anchor.group.add(audio)

    // 5) To allow the spatial audio effect to take place, we also need to set a reference distance.
    // This tells THREE.js to start diminishing the audio at a chosen distance.
    // Since the distance scale differs from real physical world scale, we'll just use an arbitrary value here (the author uses 100).
    audio.setRefDistance(400)

    // 6) Finally, we have to assign the audio clip to the audio object...
    audio.setBuffer(audioClip)

    // 7) ... and, optionally, we can set the audioloop as 'true':
    audio.setLoop(true)




    anchor.onTargetFound = () => {
      audio.play()   // the song is played when the raccoon is found (instead of when the app starts)
    }

    anchor.onTargetLost = () => {
      audio.pause()  // pause the song when the raccoon is lost.
    }

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
