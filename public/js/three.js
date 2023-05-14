const backgroundContainer = document.getElementById("background-container");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
backgroundContainer.appendChild(renderer.domElement);

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float time;
  void main() {
    vec2 uv = vUv;
    float lightness = sin(uv.y * 2.0 * 3.14159 + time * 0.5) * 0.5 + 0.5;
    vec3 blackColor = vec3(0.0);
    vec3 darkGrayColor = vec3(0.3);
    vec3 color = mix(blackColor, darkGrayColor, lightness);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const uniforms = {
  time: { value: 0 },
};

const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: uniforms,
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
camera.position.z = 1;

function animate(time) {
  requestAnimationFrame(animate);
  uniforms.time.value = time / 1000;
  renderer.render(scene, camera);
}

animate();
