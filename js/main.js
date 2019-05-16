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

// Create Shape
const geometry = new THREE.BoxGeometry(2, 2, 2);
//Texture
const cubeMaterials = [
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("textures/1.jpg"), //Right Side
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("textures/2.jpg"), //Left Side
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("textures/3.gif"), //Top Side
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("textures/4.jpg"), //Bottom Side
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("textures/5.jpg"), //Front Side
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("textures/6.jpg"), //Back Side
    side: THREE.DoubleSide
  })
];
const cubeMaterialColors = [
  new THREE.MeshBasicMaterial({
    color: 0x1919ff, //Right Side
    side: THREE.DoubleSide
  }),
  new THREE.MeshPhongMaterial({
    color: 0xffff00, //Left Side
    side: THREE.DoubleSide
  }),
  new THREE.MeshLambertMaterial({
    color: 0x008000, //Top Side
    side: THREE.DoubleSide
  }),
  new THREE.MeshPhongMaterial({
    color: 0xff0000, //Bottom Side
    side: THREE.DoubleSide
  }),
  new THREE.MeshLambertMaterial({
    color: 0xffa500, //Front Side
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    color: 0xffffff, //Back Side
    side: THREE.DoubleSide
  })
];

// create a material, image or texture
const material = new THREE.MeshFaceMaterial(cubeMaterials);
cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;

// Floor
const FloorGeometry = new THREE.CubeGeometry(10, 1, 10);
const FloorMaterial = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load("textures/ground.jpg"),
  side: THREE.DoubleSide
});
const FloorCube = new THREE.Mesh(FloorGeometry, FloorMaterial);
FloorCube.position.y = -5;
scene.add(FloorCube);
// Ceiling
const CeilingGeometry = new THREE.CubeGeometry(10, 1, 10);
const CeilingMaterial = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load("textures/ceiling.jpg"),
  side: THREE.DoubleSide
});
const CeilingCube = new THREE.Mesh(CeilingGeometry, CeilingMaterial);
CeilingCube.position.y = 5;
scene.add(CeilingCube);
// LeftWall
const LeftWallGeometry = new THREE.CubeGeometry(1, 10, 10);
const LeftWallMaterial = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load("textures/wall.jpg"),
  side: THREE.DoubleSide
});
const LeftWallCube = new THREE.Mesh(LeftWallGeometry, LeftWallMaterial);
LeftWallCube.position.x = -5;
scene.add(LeftWallCube);
// RightWall
const RightWallGeometry = new THREE.CubeGeometry(1, 10, 10);
const RightWallMaterial = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load("textures/wall.jpg"),
  side: THREE.DoubleSide
});
const RightWallCube = new THREE.Mesh(RightWallGeometry, RightWallMaterial);
RightWallCube.position.x = 5;
scene.add(RightWallCube);

// Lighting. Area Spread
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

// Point Lighting
const light1 = new THREE.PointLight(0xff0040, 4, 50);
// scene.add(light1);
const light2 = new THREE.PointLight(0x0040ff, 2, 50);
// scene.add(light2);
const light3 = new THREE.PointLight(0x80ff80, 4, 50);
// scene.add(light3);

// Directional Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);
// scene.add(directionalLight);

// Spot Lighting
const spotLight = new THREE.SpotLight(0xff45f6, 25);
spotLight.position.set(0, 3, 0);
// scene.add(spotLight);

// Game Logic
const update = function() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.005;
  const time = Date.now() * 0.0005;

  light1.position.x = Math.sin(time * 0.7) * 30;
  light1.position.y = Math.cos(time * 0.5) * 40;
  light1.position.z = Math.cos(time * 0.3) * 30;

  light2.position.x = Math.cos(time * 0.3) * 30;
  light2.position.y = Math.sin(time * 0.5) * 40;
  light2.position.z = Math.sin(time * 0.7) * 30;

  light3.position.x = Math.sin(time * 0.7) * 30;
  light3.position.y = Math.cos(time * 0.3) * 40;
  light3.position.z = Math.sin(time * 0.5) * 30;
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
