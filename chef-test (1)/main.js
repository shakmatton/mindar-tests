import {loadGLTF} from "./loader.js" 

const THREE = window.MINDAR.IMAGE.THREE

document.addEventListener("DOMContentLoaded", () => {
    const start = async() => {
                        
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./targets.mind"
        })

        const {scene, camera, renderer} = mindarThree

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
        scene.add(light)

        // const geometry = new THREE.PlaneGeometry(1, 1)
        // const material = new THREE.MeshBasicMaterial({color: 'blue', transparent: true, opacity: 0.5})
        // const plane = new THREE.Mesh(geometry, material)

        const apple = await loadGLTF("./assets/maçã/Maçã.gltf")

        apple.scene.scale.set(0.05, 0.05, 0.05)
        apple.scene.position.set(-0.44, 0.09, 0)
        
        const anchor = mindarThree.addAnchor(0)
        anchor.group.add(apple.scene)

        await mindarThree.start()

        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera)
        })
    }
    start()
})
