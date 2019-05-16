let scene, camera, renderer, cube, controls;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  75, //Camera frustum vertical field of view.
  window.innerWidth / window.innerHeight, //Camera frustum aspect ratio
  0.1, // Camera frustum near plane
  1000 // Camera frustum far plane
);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", resizeWindow);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.zoomSpeed = 1.2;

// Face Model Loader

var loader = new THREE.ObjectLoader();
loader.load("models/Head.json", function(object) {
  scene.add(object);
});

camera.position.z = 5;

// Game Logic
const update = function() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.005;
};

// Draw Scene
const render = function() {
  renderer.render(scene, camera);
};

// Run Game Loop ( update, render m repeat)
const GameLoop = function() {
  requestAnimationFrame(GameLoop);
  update();
  render();
};

function resizeWindow() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

GameLoop();
