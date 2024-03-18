//Base
const canvas = document.querySelector(".webgl");

//Scene
const scene = new THREE.Scene();

//GLTF Loader
let donut = null;
const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load(
  "./assets/donut_2.0/scene.gltf",
  (gltf) => {
    donut = gltf.scene;

    const radius = 8.5;

    donut.rotation.x = Math.PI * 0.25;

    donut.scale.set(radius, radius, radius);

    scene.add(donut);
  },
  (progress) => {
    console.log(progress);
  },
  (error) => {
    console.error(error);
  }
);

// let donut2 = null;
// const gltfLoader2 = new THREE.GLTFLoader();
// gltfLoader2.load(
//   "./assets/donut_2.0/scene.gltf",
//   (gltf) => {
//     donut2 = gltf.scene;

//     const radius = 8.5;
//     donut2.position.x = 1.5;

//     donut2.rotation.x = Math.PI * 0.25;

//     donut2.scale.set(radius, radius, radius);

//     scene.add(donut2);
//   },
//   (progress) => {
//     console.log(progress);
//   },
//   (error) => {
//     console.error(error);
//   }
// );

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 5;
scene.add(camera);

//Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 2, 0);
scene.add(directionalLight);

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.render(scene, camera);

//Animation
const clock = new THREE.Clock();
let lastElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - lastElapsedTime;
  lastElapsedTime = elapsedTime;

  if (!!donut) {
    donut.position.y = Math.sin(elapsedTime * 0.5) * 0.1 - 0.1;
  }

  //Render
  renderer.render(scene, camera);

  //Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

//On Reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}