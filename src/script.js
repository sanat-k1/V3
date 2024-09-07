import * as THREE from 'three';
import gsap from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from 'stats.js';

/**
 * Debug
 */
const stat = new Stats();
stat.showPanel(0, 2);
document.body.appendChild(stat.dom);

const gltfloader = new GLTFLoader();

const parameters = {
    materialColor: '#ffeded'
};

const objectsDistance = 4;

/**
 * Function to load models
 */
const loadModel = (path, scale, position, rotation, canvasId) => {
    return new Promise((resolve, reject) => {
        const canvas = document.getElementById(canvasId);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const camera = new THREE.PerspectiveCamera(35, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
        camera.position.z = 6;

        const scene = new THREE.Scene();

        const light = new THREE.AmbientLight(0x404040, 3);
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
        directionalLight.position.set(1, 1, 0);
        scene.add(directionalLight);

        gltfloader.load(
            path,
            (gltf) => {
                gltf.scene.traverse((node) => {
                    if (node.isMesh) {
                        node.material.metalness = 0.5;
                    }
                });
                gltf.scene.scale.set(...scale);
                gltf.scene.position.set(...position);
                gltf.scene.rotation.set(...rotation);
                scene.add(gltf.scene);

                const tick = () => {
                    
                    // Add rotation to the model
                    gltf.scene.rotation.y += 0.01;
                    // gltf.scene.rotation.x += 0.005;

                    renderer.render(scene, camera);
                    requestAnimationFrame(tick);
                    
                };
                tick();
                resolve(gltf.scene);
            },
            undefined,
            reject
        );
    });
};


/**
 * Load models onto their respective canvases
 */
const sectionMeshesPromises = [
    loadModel('models/rtx3090.glb', [0.35, 0.35, 0.35], [0,0,0], [Math.PI * 2, Math.PI / 2.1, Math.PI / 2], 'canvas-r3090'),
    loadModel('models/rtx3080.glb', [1.1,1.1,1.1], [0,0,0], [Math.PI / 2, Math.PI * 2, Math.PI / 2], 'canvas-r3080'),
    loadModel('models/rtx3070.glb', [0.016, 0.016, 0.016], [0,0,0], [Math.PI * 2, Math.PI / 1.2, Math.PI / 2], 'canvas-r3070'),
    loadModel('models/rtx30602.glb', [0.6, 0.6, 0.6], [0,1,0], [Math.PI * 2, Math.PI / 2.1, Math.PI / 2], 'canvas-r3060'),
    loadModel('models/rtx2080.glb', [0.55, 0.55, 0.55], [0,0,0], [Math.PI * 2, Math.PI / 2.1, Math.PI / 2], 'canvas-r2080'),
    loadModel('models/rtx2070-v1.glb', [0.011, 0.011, 0.011], [0,0,0], [Math.PI * 2, Math.PI / 2.1, Math.PI / 2], 'canvas-r2070'),
    loadModel('models/rtx2060-v1.glb', [0.011, 0.011, 0.011], [0,0,0], [Math.PI * 2, Math.PI / 2.1, Math.PI / 2], 'canvas-r2060')
];

Promise.all(sectionMeshesPromises).then(() => {
    console.log('All models loaded successfully');
}).catch(error => {
    console.error('Error loading models:', error);
});
