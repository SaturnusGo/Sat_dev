const container = document.getElementById('webgl-animation');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 4, 1);

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float time;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float c = 0.2 * sin(uv.y * 20.0 + time) + 0.2;
  gl_FragColor = vec4(vec3(c), 1.0);
}
`;

const uniforms = {
  time: { value: 0.0 }
};

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms
});

const meshes = [];

for (let i = 0; i < 50; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = Math.random() * 10 - 5;
  mesh.position.y = Math.random() * 4 - 2;
  mesh.position.z = Math.random() * -10;
  mesh.scale.x = Math.random() * 0.5 + 0.1;
  mesh.scale.y = Math.random() * 4 + 1;
  mesh.scale.z = Math.random() * 0.5 + 0.1;
  scene.add(mesh);
  meshes.push(mesh);
}

function animate() {
  requestAnimationFrame(animate);
  uniforms.time.value += 0.01;

  for (const mesh of meshes) {
    mesh.position.x += 0.01;

    if (mesh.position.x > 5) {
      mesh.position.x = -5;
    }
  }

  renderer.render(scene, camera);
}

animate();
