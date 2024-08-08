import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import Stats from 'stats.js'
/**
 * Debug
 */
// const gui = new dat.GUI()
const stat = new Stats()
stat.showPanel(0,2)
document.body.appendChild(stat.dom)


const gltfloader = new GLTFLoader()

const parameters = {
    materialColor: '#ffeded'
}

// gui
//     .addColor(parameters, 'materialColor')
//     .onChange(() =>
//     {
//         material.color.set(parameters.materialColor)
//         particlesMaterial.color.set(parameters.materialColor)
//     })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// Texture
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter

// Material
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})

// Objects
const objectsDistance = 4

// load all models

let rtx3090 = null
gltfloader.load(
    'models/nvidia_geforce_rtx_3090_founders_edition_free.glb',
    (gltf) =>{
        gltf.scene.traverse((node) => {
            if (node.isMesh) {
                    node.material.metalness = 0.5; // Adjust metalness for better appearance
                
            }
        });
        rtx3090=gltf.scene
        scene.add(gltf.scene)
        gltf.scene.scale.set(0.19,0.19,0.19)
        gltf.scene.position.y = - objectsDistance * 1.3
        gltf.scene.rotation.x = Math.PI *2
        gltf.scene.rotation.z= Math.PI /2.1
        gltf.scene.rotation.y = Math.PI /2
        gltf.scene.position.x=-2
    },
    undefined,
    (error)=>{
        console.log(error)

    }
) 
let rtx3080=null
gltfloader.load(
    'models/card.glb',
    (gltf)=>{
        rtx3080=gltf.scene
        gltf.scene.traverse((node) => {
            if (node.isMesh) {
                    node.material.metalness = 0.5; // Adjust metalness for better appearance
                
            }
        });
        
        gltf.scene.scale.set(0.6,0.6,0.6)
        gltf.scene.position.x=2
        scene.add(rtx3080)
        gltf.scene.position.y = - objectsDistance * 1.33
        scene.add(light)
        gltf.scene.rotation.x = Math.PI/ 2
        gltf.scene.rotation.z= (Math.PI / 2)
        gltf.scene.rotation.y = Math.PI *2
    }
)
let rtx3070 = null
gltfloader.load(
    'models/nvidia_geforce_rtx_3070_-_updated.glb',
    (gltf)=>{
        
        gltf.scene.children[0].scale.set(0.008,0.008,0.008)
        scene.add(gltf.scene)
       gltf.scene.position.y = - objectsDistance * 2.25
       gltf.scene.position.x= -2.4
       gltf.scene.rotation.x = Math.PI *2
        gltf.scene.rotation.z= Math.PI /2
        gltf.scene.rotation.y = (Math.PI /1.2)
       rtx3070=gltf.scene
    }
)
let rtx3060 = null
let rtmixer2 = null
gltfloader.load(
    'models/rtx3060.glb',
    (gltf)=>{
        rtmixer2 = new THREE.AnimationMixer(gltf.scene)
        const action  = rtmixer2.clipAction(gltf.animations[0])
        action.play()
        
        gltf.scene.scale.set(0.006,0.006,0.006)
        gltf.scene.position.x=2
        rtx3060 = gltf.scene
        scene.add(gltf.scene)
        gltf.scene.position.y= - objectsDistance * 2.25
        gltf.scene.rotation.x = Math.PI *2
        gltf.scene.rotation.z= Math.PI /2.1
        gltf.scene.rotation.y = Math.PI /2
    }
)
let rtx2080 = null
gltfloader.load(
    'models/nvidia_rtx_2080_ti.glb',
    (gltf)=>{
        gltf.scene.traverse((node) => {
            if (node.isMesh) {
                    node.material.metalness = 0.5; // Adjust metalness for better appearance
                
            }
        });
        gltf.scene.children[0].scale.set(0.35,0.35,0.35)
        rtx2080=gltf.scene
        scene.add(gltf.scene)
        gltf.scene.position.y = - objectsDistance * 3.27
        gltf.scene.position.x = -2.15
        gltf.scene.rotation.x = Math.PI *2
        gltf.scene.rotation.z= Math.PI /2.1
        gltf.scene.rotation.y = Math.PI /2
    }
)

let rtx2070 = null
let rtmixer3 = null
gltfloader.load(
    'models/rtx2070.glb',
    (gltf)=>{   
        rtx2070=gltf.scene
        gltf.scene.scale.set(0.0061,0.0061,0.0061)
        gltf.scene.position.y = - objectsDistance * 3.3
        gltf.scene.position.x = 2
        scene.add(gltf.scene)    
        gltf.scene.rotation.x = Math.PI *2
        gltf.scene.rotation.z= Math.PI /2.1
        gltf.scene.rotation.y = Math.PI /2
    }
)
let rtx2060 = null
gltfloader.load(
    'models/rtx2060.glb',
    (gltf)=>{
        scene.add(gltf.scene)
        gltf.scene.scale.set(0.0061,0.0061,0.0061)
        gltf.scene.position.y = - objectsDistance * 4.2
        gltf.scene.position.x = -2
        rtx2060=gltf.scene
        gltf.scene.rotation.x = Math.PI *2
        gltf.scene.rotation.z= Math.PI /2.1
        gltf.scene.rotation.y = Math.PI /2
    }
)
const light = new THREE.AmbientLight( 0x404040,3)
scene.add( light );

const sectionMeshes = [ rtx3090,rtx3080,rtx3070,rtx2080,rtx2070,rtx2060]

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

/**
 * Particles
 */
// Geometry
const particlesCount = 200
const positions = new Float32Array(particlesCount * 3)

for(let i = 0; i < particlesCount; i++)
{
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: textureLoader,
    size: 0.03
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Update sizes and renderer
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }, 200);
});


/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */
let scrollY = window.scrollY
let currentSection = 0

window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)

    if(newSection != currentSection)
    {
        currentSection = newSection
        if (sectionMeshes[currentSection]){
        gsap.to(
            
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                z: '+=1.5'
            }
        
        )
    }
    }
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    stat.begin()
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance

    const parallaxX = cursor.x * 0.5
    const parallaxY = - cursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

    // Animate meshes
    // for(const mesh of sectionMeshes)
    // {
    //     if(mesh){
    //     mesh.rotation.x += deltaTime * 0.1
    //     mesh.rotation.y += deltaTime * 0.12
    //     }
    // }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    stat.end()
}
console.log(renderer.info)
tick()