// Import necessary modules
import * as THREE from 'three';
import Stats from 'stats.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';



// Variables for storing models
let rtx3080Model, rtx3090Model, rtx3070Model, rtx3060Model, rtx2080Model, rtx2070Model, rtx2060Model;

// Model loading functions
export function rtx3090(scene) {
    return new Promise((resolve, reject) => {
        const gltfloader = new GLTFLoader();
        gltfloader.load('/models/rtx3090.glb', (gltf) => {
            rtx3090Model = gltf.scene;
            rtx3090Model.traverse((node) => {
                if (node.isMesh) {
                    node.material.metalness = 0.5;
                }
            });
            rtx3090Model.scale.set(0.19, 0.19, 0.19);
            rtx3090Model.rotation.set(Math.PI * 2, Math.PI / 2, Math.PI / 2.1);
            scene.add(rtx3090Model);
            resolve(rtx3090Model);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

export function rtx3080(scene) {
    return new Promise((resolve, reject) => {
        const gltfloader = new GLTFLoader();
        gltfloader.load('/models/rtx3080.glb', (gltf) => {
            rtx3080Model = gltf.scene;
            rtx3080Model.traverse((node) => {
                if (node.isMesh) {
                    node.material.metalness = 0.5;
                }
            });
            rtx3080Model.scale.set(0.6, 0.6, 0.6);
            rtx3080Model.rotation.set(Math.PI / 2, Math.PI * 2, Math.PI / 2);
            scene.add(rtx3080Model);
            resolve(rtx3080Model);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

export function rtx3070(scene) {
    return new Promise((resolve, reject) => {
        const gltfloader = new GLTFLoader();
        gltfloader.load('/models/rtx3070.glb', (gltf) => {
            rtx3070Model = gltf.scene;
            rtx3070Model.children[0].scale.set(0.008, 0.008, 0.008);
            rtx3070Model.rotation.set(Math.PI * 2, Math.PI / 1.2, Math.PI / 2);
            scene.add(rtx3070Model);
            resolve(rtx3070Model);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

export function rtx3060(scene) {
    return new Promise((resolve, reject) => {
        const gltfloader = new GLTFLoader();
        gltfloader.load('/models/rtx30602.glb', (gltf) => {
            rtx3060Model = gltf.scene;
            rtx3060Model.traverse((node) => {
                if (node.isMesh) {
                    node.material.metalness = 0.3;
                }
            })
            rtx3060Model.scale.set(0.3, 0.3, 0.3);
            rtx3060Model.rotation.set(Math.PI * 2, Math.PI / 2, Math.PI / 2.1);
            scene.add(rtx3060Model);

            // Add a point light near the RTX 3060 model
            const pointLight = new THREE.PointLight(0xffffff, 1, 100); // Color, intensity, distance
            pointLight.position.set(2, 2, 2); // Position the light (x, y, z)
            scene.add(pointLight);

            // Optionally, add a helper to visualize the light position (remove in production)
            // const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
            // scene.add(pointLightHelper);

            resolve(rtx3060Model);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

export function rtx2080(scene) {
    return new Promise((resolve, reject) => {
        const gltfloader = new GLTFLoader();
        gltfloader.load('/models/rtx2080.glb', (gltf) => {
            rtx2080Model = gltf.scene;
            rtx2080Model.traverse((node) => {
                if (node.isMesh) {
                    node.material.metalness = 0.5;
                }
            });
            rtx2080Model.children[0].scale.set(0.35, 0.35, 0.35);
            rtx2080Model.rotation.set(Math.PI * 2, Math.PI / 2, Math.PI / 2.1);
            scene.add(rtx2080Model);
            resolve(rtx2080Model);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

export function rtx2070(scene) {
    return new Promise((resolve, reject) => {
        const gltfloader = new GLTFLoader();
        gltfloader.load('/models/rtx2070-v1.glb', (gltf) => {
            rtx2070Model = gltf.scene;
            rtx2070Model.scale.set(0.0061, 0.0061, 0.0061);
            rtx2070Model.rotation.set(Math.PI * 2, Math.PI / 2, Math.PI / 2.1);
            scene.add(rtx2070Model);
            resolve(rtx2070Model);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

export function rtx2060(scene) {
    return new Promise((resolve, reject) => {
        const gltfloader = new GLTFLoader();
        gltfloader.load('/models/rtx2060-v1.glb', (gltf) => {
            rtx2060Model = gltf.scene;
            rtx2060Model.scale.set(0.0061, 0.0061, 0.0061);
            rtx2060Model.rotation.set(Math.PI * 2, Math.PI / 2, Math.PI / 2.1);
            scene.add(rtx2060Model);
            resolve(rtx2060Model);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

// Export all model functions together
export const modelFunctions = {
    rtx3080,
    rtx3090,
    rtx3070,
    rtx3060,
    rtx2080,
    rtx2070,
    rtx2060
};

function disposeModel(model) {
    if (model) {
        // Remove the model from the scene
        scene.remove(model);

        // Dispose of all materials
        model.traverse((child) => {
            if (child.isMesh) {
                if (child.material.map) child.material.map.dispose();
                if (child.material.bumpMap) child.material.bumpMap.dispose();
                if (child.material.normalMap) child.material.normalMap.dispose();
                if (child.material.specularMap) child.material.specularMap.dispose();
                child.material.dispose();
            }
        });

        // Dispose of geometries
        model.traverse((child) => {
            if (child.isMesh) {
                child.geometry.dispose();
            }
        });
    }
}


// Function to handle model loading and scene setup


    console.log("The model is:", model);

    const canvas = document.querySelector('canvas.webgl');
    const scene = new THREE.Scene();

    // Set up lighting


    // Set up camera
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 5)
    scene.add(camera);
    
    // Handle window resize
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        powerPreference: 'high-performance',
        antialias: false
    });
    
    const light = new THREE.AmbientLight(0x404040, 3);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight('#ffffff', 5);
    directionalLight.position.set(1, 1, 0);
    scene.add(directionalLight);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const controls = new ArcballControls(camera,canvas,scene)
    let mde = null
    // Load and add the model to the scene
    let currentModel = null
    modelFunctions[model](scene).then(md => {
         // This will log the model after it's loaded
        currentModel = md
        mde=md
        
        
    }).catch(error => {
        console.error('Error loading model:', error);
    });

    // Set up stats panel for monitoring performance
    const stat = new Stats();
    document.body.appendChild(stat.dom);
 
    // Animate the scene
    const clock = new THREE.Clock();
    

    
    controls.enableZoom=false
    controls.update()
    controls.setCenter(0,0,0)
    
    
    let previousTime = 0
    const tick = () => {
        stat.begin()

        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - previousTime
        previousTime = elapsedTime
        if(mde){
            mde.rotation.x+=deltaTime*0.1
            mde.rotation.y+=deltaTime*0.1
        }
        // Render the scene
        renderer.render(scene, camera)

        // Call tick again on the next frame
        requestAnimationFrame(tick)
        controls.update()
        stat.end()
    };
    
    console.log(renderer.info)
    tick();
    function dispose() {
        // Dispose of all geometries
        scene.traverse((object) => {
            if (object.isMesh) {
                if (object.material) {
                    if (object.material.map) object.material.map.dispose();
                    if (object.material.bumpMap) object.material.bumpMap.dispose();
                    if (object.material.normalMap) object.material.normalMap.dispose();
                    if (object.material.specularMap) object.material.specularMap.dispose();
                    object.material.dispose();
                }
                if (object.geometry) {
                    object.geometry.dispose();
                }
            }
        });
    
        // Dispose of all textures
        Object.values(renderer.info.memory.textures).forEach(texture => texture.dispose());
    
        // Dispose of WebGL programs
        renderer.info.programs.forEach(program => {
            program.destroy();
        });
    
        // Dispose of renderer
        if (renderer) {
            renderer.dispose();
        }
    
        // Dispose of controls
        if (controls) {
            controls.dispose();
        }
    
        // Clean up event listeners
        window.removeEventListener('resize', onWindowResize);
        window.removeEventListener('beforeunload', dispose);
    
        // Clear the scene
        while (scene.children.length > 0) {
            const child = scene.children[0];
            scene.remove(child);
            if (child.isMesh) {
                child.geometry.dispose();
                child.material.dispose();
            }
        }
    }
    
    // Example resize handler
    function onWindowResize() {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    
    // Call dispose on page unload
    window.addEventListener('beforeunload', dispose);
    
    
    window.addEventListener('beforeunload', () => {
        if (currentModel) {
            disposeModel(currentModel);
        }
        dispose()
    });