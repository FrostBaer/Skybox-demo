import './style.css'

import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene, camera, renderer;

scene = new THREE.Scene;
camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
camera.position.set(-900, -200, -900);

renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', renderer);
controls.minDistance = 500;
controls.maxDistance = 2500;

let materialArray = [];
let texture_px = new THREE.TextureLoader().load('assets/posx.jpg');
let texture_py = new THREE.TextureLoader().load('assets/posy.jpg');
let texture_pz = new THREE.TextureLoader().load('assets/posz.jpg');
let texture_nx = new THREE.TextureLoader().load('assets/negx.jpg');
let texture_ny = new THREE.TextureLoader().load('assets/negy.jpg');
let texture_nz = new THREE.TextureLoader().load('assets/negz.jpg');

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_px }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_nx }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_py }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ny }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_pz }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_nz }));

for (let i = 0; i < 6; i++) {
  materialArray[i].side = THREE.BackSide;
}

const skybox = new THREE.Mesh(
  new THREE.BoxGeometry(10000, 10000, 10000),
  materialArray
);

skybox.rotation.y += 1;

scene.add(skybox);

// Zoom on scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.x = t * 0.4;
}
document.body.onscroll = moveCamera;

// Stop rotation on click
let speed = 0.0005;
document.body.onclick = () => speed ? speed = 0 : speed = 0.0005;

function animate() {
  requestAnimationFrame(animate);
  
  skybox.rotation.y += speed;  

  renderer.render(scene, camera);
}

animate();