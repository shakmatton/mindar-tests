/* WARNING: This Youtube lesson doesn't work on Brave Browser. Use Firefox instead.
  
   PS. 1: Don't worry if some videos are not be displayed fully. This is Youtube policy... sometimes copyrighted videos can only be watched inside the Youtube site.  
   PS. 2: Check out the index file too.

// ================================================================================   

Here we do a similar exercise as we did with '241-vimeo'.
However, Youtube videos on AR need a special approach.

This is due the <iframe> being moved. Explanation: the AR engine continuously updates the position of the element by updating the CSS transform properties.
So, the author suspects changing the transform properties might cause the player to stop.

The workaround: make it work using the Youtube player API.   */

// ================================================================================

/*  Here are some final considerations of the author about video and AR:

 Using videoTexture method is good for creating effects. Greenscreen video is a very good example.
 Another example is for when the video is very short, like, less than 3 seconds.
 
 However, it would be wise to not use it with long videos because it "hurts" the loading time.
 So, you're most likely to download the whole video first, and have it ready before launching the AR effect.
 This can consume a lot of bandwidth... instead, just use streaming services like Youtube, and save some bandwidth!      */



import { CSS3DObject } from './CSS3DRenderer.js';
const THREE = window.MINDAR.IMAGE.THREE;

const createYoutube = () => {                                        // The method 'createYoutube'.   
  return new Promise((resolve, reject) => {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    const onYouTubeIframeAPIReady = () => {
      const player = new YT.Player('player', {                      
	      // videoId: 'oEe8sK3dIKM',                                      // The VideoId example, given by the tutorial. 
        // videoId: 'ZJ8xUlaIQNo',                                      // Another arbitrary VideoId ('Praia da Fazendinha').   	      
        videoId: 'CsGYh8AacgY',                                      	  // Another arbitrary VideoId ('Charlie the Unicorn').   	                  
        events: {
	        onReady: () => {
	          resolve(player);
	        }
	      }
      });
    }
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const player = await createYoutube();                           // The method 'createYoutube' here creates our Player object.

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './course-banner.mind',
    });
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

    const obj = new CSS3DObject(document.querySelector("#ar-div"));
    const cssAnchor = mindarThree.addCSSAnchor(0);
    cssAnchor.group.add(obj);


    // Using an API is superior to an <iframe>: it offers more control over the lifecycle of the video.
    // For example, you can start the player when the target is being detected ('playVideo'), or pause it, when the target is lost ('pauseVideo').
    // (You can also check similar things like this for Vimeo API player as well!)

    cssAnchor.onTargetFound = () => {
      player.playVideo();                       // playVideo()
    }
    cssAnchor.onTargetLost = () => {
      player.pauseVideo();                      // pauseVideo() 
    }

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      cssRenderer.render(cssScene, camera);
    });
  }
  start();
});
