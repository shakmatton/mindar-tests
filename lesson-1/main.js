import * as THREE from "./three.module.js"

addEventListener("DOMContentLoaded", () => {

    const scene = new THREE.Scene()

    // The commented code will be used in another lesson...

    // const mindARTHREE = window.THREE.mindARTHREE
    // const {renderer, scene, camera} = mindARTHREE
   
    const geometry = new THREE.BoxGeometry(1, 1, 1)         

    const material = new THREE.MeshBasicMaterial({ 
        color: 'red', 
        transparent: true,           // Transparency and opacity are optional
        opacity: 0.5
    })

    const cube = new THREE.Mesh(geometry, material)

    scene.add(cube)

    cube.position.set(4, 3, -2)
    cube.rotation.set(Math.PI/4, Math.PI/4, 1.5)
    //cube.rotation.set(0.4, 0.6, 0.3)
    
    const camera = new THREE.PerspectiveCamera()     

    camera.position.set(2, 2, 5)
    // scene.add(camera)

    const renderer = new THREE.WebGLRenderer( {alpha: true} )  
    // alpha makes the background transparent, replacing the original black background. 
        
    renderer.setSize(500, 500)        // renderer size
    renderer.render(scene, camera)    // renderer content to be rendered (our scene and our camera).
    
    // we have to prepare and insert our webcam video media into the DOM tree...
    const video = document.createElement("video")           // create a video element named "video"

    navigator.mediaDevices.getUserMedia({ video: true })    // we'll use only the video source from the user media devices
        .then((stream) => {                                 // this Promise will use a stream as argument. When we have it, do this:
            video.srcObject = stream                        // video srcObject property gets the stream 
            video.play()                                    // video is played
        })
    
    document.body.appendChild(video)                        // appends our video element into the DOM tree, inside the document body.
    
    // We want the video to overlap the renderer. Let's set this using CSS properties:
    video.style.position = "absolute"    // CSS <style> position attribute.

    // Video dimensions should match Renderer dimensions. So, let's use CSS again:
    video.style.width = renderer.domElement.width
    video.style.height = renderer.domElement.height   

    // Video needs to overlap the renderer. Let's set this using CSS properties:
    renderer.domElement.style.position = "absolute"

    // finally, we will append our canvas renderer into the DOM tree, like this:
    document.body.appendChild(renderer.domElement)
        
    }
)


