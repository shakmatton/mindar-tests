/* The point of using a Camera-Mock is to save some time between tests and debugs... */


const THREE = window.MINDAR.IMAGE.THREE;
import {mockWithVideo, mockWithImage} from "./camera-mock.js"

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {

    
  /*   ORIGINAL WAY OF MOCKING THE WEBCAM, WITHOUT IMPORTING 'mockWithVideo'...   
  
    navigator.mediaDevices.getuserMedia = () => {
      return new Promise((resolve, reject) => {
        const video = document.createElement("video")
        video.setAttribute("src", "./course-banner1.mp4")
        video.setAttribute("loop",  "")

        video.oncanplay = () => {
          video.play()
          resolve(video.captureStream())
        }
      }) 
    }

      AVOID WRITING ALL ABOVE BY IMPORTING 'mockWithVideo' above.
      ALSO, WRITE THE SINGLE LINE BELOW:                                */


    mockWithVideo("./course-banner1.mp4")
    // if you comment this line above, you can switch back to webcam video mode.

    // Besides mocking videos, you can also mock images. 
    // If that's the case, import mockWithImage and comment 'mockWithVideo' above.
    
    // mockWithImage("./course-banner1.png")
    
    /* Notice 1: in some browsers, you can't start a video without user interactions. We need to wait for this event to happen. 
    A Start button is waiting for user input. Click it to init videoplay. */

    /* Notice 2: there is a chance not all browsers will work with both Video/Image mocking...
    In this case, I got Video working with Brave Browser and Image working with Firefox.
    Solution: Use Google Chrome and have Video & Image working fine! */

    

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './course-banner.mind',
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
