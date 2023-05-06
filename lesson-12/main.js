/* 

This exercise works. However, there are some issues about rendering the video:

1 - Firefox doesn't recognize the .mp4 format. 
    Solution 1: use the .ogv format instead.
    Solution 2: just use Brave browser with any format. 

2 - In order for this exercise to work, you have to play the video and pause it at the sixth second. Then, you can scan it. 
    This way, the video plays on AR flawlessly. So, avoid letting the original video playing (otherwise, the AR scans and playback won't work properly).
    
*/



import {loadGLTF, loadVideo} from "./loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './sintel.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    // The loadVideo method will await for our Sintel video.
    const video = await loadVideo("./sintel.mp4")    

    // Creating a texture for our video:
    const texture = new THREE.VideoTexture(video)
    
    // Now, we create a plane for our video (using our new texture):

    const geometry = new THREE.PlaneGeometry(1, 204/480)                    // 1 unit of plane width === 1 unit of AR target scene width. 
                                                                            // Width of 1 treats the plane as a square. But the video is not square shaped.
                                                                            // So, we set height as 204/480 (to keep our aspect ratio). Now we have a perfect overlay.

    const material = new THREE.MeshBasicMaterial( {map:texture} )
    const plane = new THREE.Mesh(geometry, material)

    
    const anchor = mindarThree.addAnchor(0);

    anchor.group.add(plane)                       // Now we have the plane added to our anchor.

    anchor.onTargetFound = () => {                // Video plays when target is found.
      video.play()
    }

    anchor.onTargetLost = () => {                 // Video pauses when target is lost.
      video.pause()
    }

    video.addEventListener("play", () => {     //  The author captured the video frame in its 6th second, so he could use it a target image.      
      video.currentTime = 6                    //  Whenever the video plays, it will begin on the 6th second. At this second, the still image will turn into a video.
    }) 

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
