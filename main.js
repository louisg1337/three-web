import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//////////
// SET UP
//////////

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.setZ(30);

renderer.render(scene, camera);

//////////////
// SHAPES
//////////////

const geometry = new THREE.TorusGeometry(10, 5, 24, 100);
const material = new THREE.MeshStandardMaterial( { color: 0xFF6345 });
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

//////////////
// LIGHTING
//////////////

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,10,5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

//////////////
// FUNCTIONS
//////////////


function addStar() {
  const starGeometry = new THREE.SphereGeometry(.25, .25, 2);
  const starMaterial = new THREE.MeshStandardMaterial({ color: '#fffcb0'});
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));
  star.position.set(x, y, z);

  scene.add(star);
}

for (let i = 0; i < 200; i++) { addStar() };


const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render( scene, camera );
}

animate();