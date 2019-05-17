(function() {
  var script = document.createElement("script");
  script.onload = function() {
    var stats = new Stats();
    document.body.appendChild(stats.dom);
    requestAnimationFrame(function loop() {
      stats.update();
      requestAnimationFrame(loop);
    });
  };
  script.src = "//mrdoob.github.io/stats.js/build/stats.min.js";
  document.head.appendChild(script);
})();

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
loader.load("models/platform.json", function(object) {
  scene.add(object);
});

// Lighting. Area Spread
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

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
