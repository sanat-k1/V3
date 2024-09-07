

let rtx3080Model, rtx3090Model, rtx3070Model, rtx3060Model, rtx2080Model, rtx2070Model, rtx2060Model

export function rtx3090(scene,gltfloader) {
    return new Promise((resolve, reject) => {
        const gltfloader = new GLTFLoader()
        gltfloader.load('/models/rtx3090.glb', (gltf) => {
            rtx3090Model = gltf.scene
            rtx3090Model.traverse((node) => {
                if (node.isMesh) {
                    node.material.metalness = 0.5 // Adjust metalness for better appearance
                }
            })
            rtx3090Model.scale.set(0.19, 0.19, 0.19)
            rtx3090Model.rotation.x = Math.PI * 2
            rtx3090Model.rotation.z = Math.PI / 2.1
            rtx3090Model.rotation.y = Math.PI / 2
            scene.add(rtx3090Model)
            resolve(rtx3090Model) // Resolve the promise with the loaded model
        }, undefined, (error) => {
            reject(error) // Reject the promise on error
        })
    })
}

export function rtx3080(scene,gltfloader) {
    return new Promise((resolve, reject) => {
        const gltfloader = new GLTFLoader()
        gltfloader.load('models/rtx3080.glb', (gltf) => {
            rtx3080Model = gltf.scene
            rtx3080Model.traverse((node) => {
                if (node.isMesh) {
                    node.material.metalness = 0.5 // Adjust metalness for better appearance
                }
            })
            rtx3080Model.scale.set(0.6, 0.6, 0.6)
            rtx3080Model.rotation.x = Math.PI / 2
            rtx3080Model.rotation.z = Math.PI / 2
            rtx3080Model.rotation.y = Math.PI * 2
            scene.add(rtx3080Model)
            resolve(rtx3080Model) // Resolve the promise with the loaded model
        }, undefined, (error) => {
            reject(error) // Reject the promise on error
        })
    })
}

export function rtx3070(scene,gltfloader) {
    return new Promise((resolve, reject) => {
        const gltfloader = new GLTFLoader()
        gltfloader.load('models/rtx3070.glb', (gltf) => {
            rtx3070Model = gltf.scene
            rtx3070Model.children[0].scale.set(0.008, 0.008, 0.008)
            rtx3070Model.rotation.x = Math.PI * 2
            rtx3070Model.rotation.z = Math.PI / 2
            rtx3070Model.rotation.y = Math.PI / 1.2
            scene.add(rtx3070Model)
            resolve(rtx3070Model) // Resolve the promise with the loaded model
        }, undefined, (error) => {
            reject(error) // Reject the promise on error
        })
    })
}

export function rtx3060(scene,gltfloader) {
    return new Promise((resolve, reject) => {
        const gltfloader = new GLTFLoader()
        gltfloader.load('models/rtx3060.glb', (gltf) => {
            rtx3060Model = gltf.scene
            rtx3060Model.scale.set(0.006, 0.006, 0.006)
            rtx3060Model.rotation.x = Math.PI * 2
            rtx3060Model.rotation.z = Math.PI / 2.1
            rtx3060Model.rotation.y = Math.PI / 2
            scene.add(rtx3060Model)
            resolve(rtx3060Model) // Resolve the promise with the loaded model
        }, undefined, (error) => {
            reject(error) // Reject the promise on error
        })
    })
}

export function rtx2080(scene,gltfloader) {
    return new Promise((resolve, reject) => {
        const gltfloader = new GLTFLoader()
        gltfloader.load('models/rtx2080.glb', (gltf) => {
            rtx2080Model = gltf.scene
            rtx2080Model.traverse((node) => {
                if (node.isMesh) {
                    node.material.metalness = 0.5 // Adjust metalness for better appearance
                }
            })
            rtx2080Model.children[0].scale.set(0.35, 0.35, 0.35)
            rtx2080Model.rotation.x = Math.PI * 2
            rtx2080Model.rotation.z = Math.PI / 2.1
            rtx2080Model.rotation.y = Math.PI / 2
            scene.add(rtx2080Model)
            resolve(rtx2080Model) // Resolve the promise with the loaded model
        }, undefined, (error) => {
            reject(error) // Reject the promise on error
        })
    })
}

export function rtx2070(scene,gltfloader) {
    return new Promise((resolve, reject) => {
        const gltfloader = new GLTFLoader()
        gltfloader.load('models/rtx2070.glb', (gltf) => {
            rtx2070Model = gltf.scene
            rtx2070Model.scale.set(0.0061, 0.0061, 0.0061)
            rtx2070Model.rotation.x = Math.PI * 2
            rtx2070Model.rotation.z = Math.PI / 2.1
            rtx2070Model.rotation.y = Math.PI / 2
            scene.add(rtx2070Model)
            resolve(rtx2070Model) // Resolve the promise with the loaded model
        }, undefined, (error) => {
            reject(error) // Reject the promise on error
        })
    })
}

export function rtx2060(scene,gltfloader) {
    return new Promise((resolve, reject) => {
        const gltfloader = new GLTFLoader()
        gltfloader.load('models/rtx2060.glb', (gltf) => {
            rtx2060Model = gltf.scene
            rtx2060Model.scale.set(0.0061, 0.0061, 0.0061)
            rtx2060Model.rotation.x = Math.PI * 2
            rtx2060Model.rotation.z = Math.PI / 2.1
            rtx2060Model.rotation.y = Math.PI / 2
            scene.add(rtx2060Model)
            resolve(rtx2060Model) // Resolve the promise with the loaded model
        }, undefined, (error) => {
            reject(error) // Reject the promise on error
        })
    })
}

export const modelFunctions = {
    rtx3080,
    rtx3090,
    rtx3070,
    rtx3060,
    rtx2080,
    rtx2070,
    rtx2060
}
function disposeModel(model) {
    if (!model) return;

    model.traverse((node) => {
        if (node.isMesh) {
            // Dispose of the geometry and material
            if (node.geometry) node.geometry.dispose();
            if (node.material) {
                if (Array.isArray(node.material)) {
                    node.material.forEach((material) => {
                        if (material.map) material.map.dispose(); // Dispose textures
                        material.dispose(); // Dispose material
                    });
                } else {
                    if (node.material.map) node.material.map.dispose(); // Dispose textures
                    node.material.dispose(); // Dispose material
                }
            }
        }
    });

    // Remove the model from the scene
    model.parent.remove(model);
}

// Example function to dispose of all models when leaving the page
function disposeAllModels() {
    disposeModel(rtx3080Model);
    disposeModel(rtx3090Model);
    disposeModel(rtx3070Model);
    disposeModel(rtx3060Model);
    disposeModel(rtx2080Model);
    disposeModel(rtx2070Model);
    disposeModel(rtx2060Model);
}

// Call this function when navigating away or before reloading the scene
window.addEventListener('beforeunload', disposeAllModels);
