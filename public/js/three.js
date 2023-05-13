const canvas = document.getElementById('bg-animation');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const particles = new THREE.BufferGeometry();
const particleCount = 2000;
const posArray = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 100;
}

particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particleMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.1,
});

const particleMesh = new THREE.Points(particles, particleMaterial);
scene.add(particleMesh);

const animateParticles = () => {
  particleMesh.rotation.x += 0.0001;
  particleMesh.rotation.y += 0.0001;
  particleMesh.rotation.z += 0.0001;

  renderer.render(scene, camera);
  requestAnimationFrame(animateParticles);
};

animateParticles();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
