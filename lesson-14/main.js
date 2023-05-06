/* This exercise is a workaround for iOS Safari browser users. 
   For audio and video, Safari doesn't allow the experience to run automatically. It requires the user to interact with it first.
   In this lesson, we'll fix that autostart issue for this specific browser.  */

   
import {loadGLTF, loadVideo} from "./loader.js";
const THREE = window.MINDAR.IMAGE.THREE;




// Previously, the start function (created at the end of the code) is located inside this DOMContentLoaded callback method.
// One quick solution: instead of calling the function start() right away, we can create a button and trigger it when the user clicks it (see it at the end of the code).





document.addEventListener('DOMContentLoaded', () => {                 


  // Sometimes, you may want to have access ready, but not to stop the AR effect right away. 
  // In that case, here is another quick trick:
  
  let video = null                     // We need to instantiate "video" as null variable.
  
  const init = async() => {            // We create an init() function. 

    video = await loadVideo("./sintel.mp4")        // We load the video, when possible.
    
    video.play()                                   // Here goes our trick: we play it and pause it. 
    video.pause()                                  // This enables the video to run programatically later on without user interactions.

  } 

  /* 
  
  This init() function (above) must be called by the user interactions. So, a natural aplication flow is to show a confirmation screen to the users.
  You could say display something to the user, like, "This is an AR effect. Please enable user camera", or something like that.
  
  Although this is not related (to our issue here), this is a nice thing to have ("Click OK, do that, etc").
  Then you can load all the videos and all the audios and apply that trick above.

  The exact implementation would depend on your application, but it's important to be aware of the Safari browser limitations (and know what must be done to get around that).
  
  */


  const start = async() => {                         
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './sintel.mind',
    });
    const {renderer, scene, camera} = mindarThree;
    
    const video = await loadVideo("./sintel.mp4")        
    const texture = new THREE.VideoTexture(video)    

    const geometry = new THREE.PlaneGeometry(1, 204/480)                    

    const material = new THREE.MeshBasicMaterial( {map:texture} )
    const plane = new THREE.Mesh(geometry, material)
    
    const anchor = mindarThree.addAnchor(0);

    anchor.group.add(plane)                       

    anchor.onTargetFound = () => {                
      video.play()
    }

    anchor.onTargetLost = () => {                 
      video.pause()
    }

    video.addEventListener("play", () => {     
      video.currentTime = 6                    
    }) 

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  // start();                             // We'll comment this line, so we can create a workaround for iOS Safari browser users

  const button = document.createElement("button")       // We create a button.
  button.textContent = "Start"                         // We name it.       
  button.addEventListener("click", start)              // We add an event listener labeled "click", with the argument 'start'.
  
  document.body.appendChild(button)                    // And finally, we append our button to our HTML body document. 

});

