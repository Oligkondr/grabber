import * as THREE from 'three';

const scene = new THREE.Scene();

let width = window.innerWidth;
let height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 3;

// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper)

// const cursor = {
//   x: 0,
//   y: 0,
// };

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'white', wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// const floor = new THREE.Mesh(
//   new THREE.PlaneGeometry(10, 10),
//   new THREE.MeshStandardMaterial({
//     color: '#444444',
//     metalness: 0,
//     roughness: 0.5,
//   }));
//
// floor.receiveShadow = true;
// floor.rotation.x = Math.PI / 2;
// scene.add(floor);

let curX = 0;
let curY = 0;

window.addEventListener('keydown', event => {
  if (event.code === 'KeyD') {
    curX = 0.01;
  }
  if (event.code === 'KeyA') {
    curX = -0.01;
  }
  if (event.code === 'KeyW') {
    curY = 0.01;
  }
  if (event.code === 'KeyS') {
    curY = -0.01;
  }
});

window.addEventListener('keyup', event => {
  if (['KeyA', 'KeyD'].includes(event.code)) {
    curX = 0;
  }
  if (['KeyW', 'KeyS'].includes(event.code)) {
    curY = 0;
  }
});

const animate = () => {
  cube.position.x += curX;
  cube.position.y += curY;
  renderer.render(scene, camera);
  // console.log(curX);
};

renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  // console.log('Apple');
  width = window.innerWidth;
  height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
});

window.addEventListener('dblclick', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.body.requestFullscreen();
  }
});

const rayCaster = new THREE.Raycaster();

const handleClick = (event) => {
  const pointer = new THREE.Vector2();
  pointer.x = (event.clientX / width) * 2 - 1;
  pointer.y = -(event.clientY / height) * 2 + 1;

  rayCaster.setFromCamera(pointer, camera);
  const intersection = rayCaster.intersectObjects(scene.children);

  for (let i = 0; i < intersection.length; i++) {
    // intersection[i].object.material.color.set('red');
    intersection[i].object.position.x = 0;
    intersection[i].object.position.y = 0;

  }
};

window.addEventListener('click', handleClick);
