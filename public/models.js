import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const gltfloader = new GLTFLoader();
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
