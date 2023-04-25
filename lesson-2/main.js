
/*   ATTENTION:
FOR ALL EXERCISES OF THIS COURSE, ALWAYS ADD FILES DIRECTLY IN THE FOLDER PROJECT (instead of pointing long relative file paths) 

================================================================================================================================ */


// MINDAR module is attached to the window object, and is accessed by the THREE.js library:
const THREE = window.MINDAR.IMAGE.THREE               

document.addEventListener('DOMContentLoaded', () => {

    const start = async () => {    // this Javascript feature is related to 'await'

        // let's instantiate an mindAR object
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({   // 2 parameters (below): 

            container: document.body,    // this envelopes our document.body 
            imageTargetSrc: "./targets.mind"
            // imageTargetSrc specifies the path to "targets.mind" file.
            // This file was generated in: https://hiukim.github.io/mind-ar-js-doc/tools/compile
        })  

        const {renderer, scene, camera} = mindarThree     // we'll just instantiate objects this way

        const geometry = new THREE.PlaneGeometry(1, 1)
        const material = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            transparent: true,
            opacity: 0.5
        })
        const plane = new THREE.Mesh(geometry, material)

        // Now we create an Anchor. It gives position/location of where the object is to be put.
        // we set addAnchor(0) because we only add one single image for tracking.
        const anchor = mindarThree.addAnchor(0)   

        anchor.group.add(plane)  
        // In this THREE.Group, the Plane is added to the anchor. Three.js groups are usually empty, and therefore, can't render anything. 
        // But when we add new objects to those groups, they automatically inherit position data from the parent's group. This enables the group rendering.   
        // The Anchor group is managed by the MindAR library, which will update position and rotation according to the tracking target.

        await mindarThree.start()                  // starts the engine
        // 'await' means we want to wait until the resource is ready. 
        // 'await' can only be used inside a single function. In this case, the function start().
        // So, we'll wrap everything up inside the function start().  

        renderer.setAnimationLoop(() => {          // this renders the scene frame by frame
            renderer.render(scene, camera)
        })
    }

    start();  // we call the start async function here

   

    
})
