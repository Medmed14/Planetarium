import * as THREE from 'three'
import GUI from 'lil-gui'

/**
 * mobile detec
 */
const isMobile = window.matchMedia("(max-width: 768px)").matches;

/**
 * Debug
 */
const planetLight = new THREE.DirectionalLight('#ffffff', 3);
const gui = new GUI()

// Contrôles pour la couleur du matériau (réservé si besoin d’étendre)
const materialControls = {
    materialColor: '#ffeded'
};

// Contrôles pour la lumière planetLight
const planetLightControls = {
    'light Z Axis': planetLight.position.z,
};
gui.add(planetLightControls, 'light Z Axis', 0, 10).onChange((value) => {
    planetLight.position.z = value;
});

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

// Textures
const textureLoader = new THREE.TextureLoader()
const sunTexture = textureLoader.load('/textures/sun/sun-texture.jpeg')
const sunNormalTexture = textureLoader.load('/textures/sun/sun-normal-map.jpeg')
const mercuryTexture = textureLoader.load('/textures/mercury/mercury.png')
const mercuryNormalTexture = textureLoader.load('/textures/mercury/mercury-normal-map-real.jpeg')
const earthDayTexture = textureLoader.load('/textures/earth/hd-earth-daymap.jpg')
const earthSpecularTexture = textureLoader.load('/textures/earth/earth_specular_map.jpg')
const earthCloudsTexture = textureLoader.load('/textures/earth/earth-clouds.png')
const moonTexture = textureLoader.load('/textures/moon/moon-texture.jpeg')
const moonNormalTexture = textureLoader.load('/textures/moon/moon-normal-map.png')
const venusTexture = textureLoader.load('/textures/venus/venusmap.jpg')
const venusNormalTexture = textureLoader.load('/textures/venus/venus-normal-map.jpeg')
const marsTexture = textureLoader.load('/textures/mars/mars-texture.jpeg')
const marsNormalTexture = textureLoader.load('/textures/mars/normal-mars.jpg')
const jupiterTexture = textureLoader.load('/textures/jupiter/jupiter-texture.jpeg')
const jupiterNormalTexture = textureLoader.load('/textures/jupiter/jupiter-normal-map.jpg')
const saturnTexture = textureLoader.load('/textures/saturn/saturn-texture.jpg')
const saturnRingTexture = textureLoader.load('/textures/saturn/saturn-rings-top.png')
// const saturnNormalTexture = textureLoader.load('/textures/saturn/saturn-normal-map.jpg')
const uranusTexture = textureLoader.load('/textures/uranus/2k_uranus.jpg')
const uranusRingTexture = textureLoader.load('/textures/uranus/transparent-texture-ring-uranus.png')
const neptuneTexture = textureLoader.load('/textures/neptune/2k_neptune.jpg')
// const neptuneNormalTexture = textureLoader.load('/textures/neptune/neptunemap.jpg')

sunTexture.colorSpace = THREE.SRGBColorSpace
mercuryTexture.colorSpace = THREE.SRGBColorSpace
earthDayTexture.colorSpace = THREE.SRGBColorSpace
earthCloudsTexture.colorSpace = THREE.SRGBColorSpace
moonTexture.colorSpace = THREE.SRGBColorSpace
venusTexture.colorSpace = THREE.SRGBColorSpace
marsTexture.colorSpace = THREE.SRGBColorSpace
jupiterTexture.colorSpace = THREE.SRGBColorSpace
saturnTexture.colorSpace = THREE.SRGBColorSpace
saturnRingTexture.colorSpace = THREE.SRGBColorSpace
uranusTexture.colorSpace = THREE.SRGBColorSpace
neptuneTexture.colorSpace = THREE.SRGBColorSpace

// MESHES
const objectsDistance = 4

// soleil
let sunGeometry = new THREE.SphereGeometry(1.4, 32, 32)
let sunMaterial = new THREE.MeshPhongMaterial({
    map: sunTexture,
    normalMap: sunNormalTexture,
    normalScale: new THREE.Vector2(0.5, 0.5)
});
let sun = new THREE.Mesh(sunGeometry, sunMaterial)
sun.name = 'sun'

// mercure
let mercuryGeometry = new THREE.SphereGeometry(0.5, 32, 32)
let mercuryMaterial = new THREE.MeshPhongMaterial({
    map: mercuryTexture,
    normalMap: mercuryNormalTexture,
    normalScale: new THREE.Vector2(0.5, 0.5)
});
let mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial)
mercury.name = 'mercury'

// venus
let venusGeometry = new THREE.SphereGeometry(1, 30, 30)
let venusMaterial = new THREE.MeshPhongMaterial({
    map: venusTexture,
    normalMap: venusNormalTexture,
    normalScale: new THREE.Vector2(1.5, 1.5)
});
let venus = new THREE.Mesh(venusGeometry, venusMaterial)
venus.name = 'venus'

// terre (groupe)
let earthGroup = new THREE.Group()
earthGroup.name = 'earth' // ★ important : nom logique du groupe Terre

let earthGeometry = new THREE.SphereGeometry(1, 30, 30)
let earthMaterial = new THREE.MeshPhongMaterial({
    map: earthDayTexture,
    specularMap: earthSpecularTexture, // Specular map de la Terre
    shininess: 50
});
let earth = new THREE.Mesh(earthGeometry, earthMaterial)
earthGroup.add(earth);

// nuages terre
let cloudGeometry = new THREE.SphereGeometry(1 * 1.02, 30, 30);
let cloudMaterial = new THREE.MeshPhongMaterial({
    map: earthCloudsTexture,
    transparent: true
});
let cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
// cloudMesh.name = 'earth' // ★ supprimé : on garde le nom sur le groupe
earthGroup.add(cloudMesh)

// lune satellite Terre
let moonGeometry = new THREE.SphereGeometry(0.273, 30, 30)
let moonMaterial = new THREE.MeshPhongMaterial({
    map: moonTexture,
    normalMap: moonNormalTexture
});
let moon = new THREE.Mesh(moonGeometry, moonMaterial)
moon.name = 'moon'
earthGroup.add(moon)

// mars
let marsGeometry = new THREE.SphereGeometry(0.7, 30, 30)
let marsMaterial = new THREE.MeshPhongMaterial({
    map: marsTexture,
    normalMap: marsNormalTexture,
    normalScale: new THREE.Vector2(1.5, 1.5)
});
let mars = new THREE.Mesh(marsGeometry, marsMaterial)
mars.name = 'mars'

// jupiter
let jupiterGeometry = new THREE.SphereGeometry(1.3, 30, 30)
let jupiterMaterial = new THREE.MeshPhongMaterial({
    map: jupiterTexture,
    normalMap: jupiterNormalTexture,
    normalScale: new THREE.Vector2(1, 1)
});
let jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial)
jupiter.name = 'jupiter'

// saturne + anneaux
let saturnGeometry = new THREE.SphereGeometry(.9, 30, 30)
let saturnMaterial = new THREE.MeshPhongMaterial({
    map: saturnTexture,
    normalScale: new THREE.Vector2(1, 1)
});
let saturn = new THREE.Mesh(saturnGeometry, saturnMaterial)
saturn.name = 'saturn'

// Anneaux de Saturne
const ringGeometry = new THREE.RingGeometry(1.1, 2.5, 64);
const pos = ringGeometry.attributes.position;
const v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++) {
    v3.fromBufferAttribute(pos, i);
    ringGeometry.attributes.uv.setXY(i, v3.length() < 2 ? 0 : 1, 1);
}
const ringMaterial = new THREE.ShaderMaterial({
    uniforms: { saturnRingTexture: { value: saturnRingTexture } },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D saturnRingTexture;
        varying vec2 vUv;
        void main() {
            vec4 color = texture2D(saturnRingTexture, vUv);
            if (color.a < 0.1) discard;
            gl_FragColor = color;
        }
    `,
    transparent: true,
    side: THREE.DoubleSide
});
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = Math.PI / 2;

// Groupe Saturne + Anneau
const saturnGroup = new THREE.Group();
saturnGroup.name = 'saturn' // ★ nom logique du groupe
saturnGroup.add(saturn);
saturnGroup.add(ring);

// URANUS + anneaux
let uranusGeometry = new THREE.SphereGeometry(1, 30, 30);
let uranusMaterial = new THREE.MeshPhongMaterial({
    map: uranusTexture,
    normalScale: new THREE.Vector2(1, 1)
});
let uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranus.name = 'uranus'

const uranusRingGeometry = new THREE.RingGeometry(1, 1.9, 64);
const uranusPos = ringGeometry.attributes.position;
const uranusV3 = new THREE.Vector3();
for (let i = 0; i < uranusPos.count; i++) {
    uranusV3.fromBufferAttribute(uranusPos, i);
    uranusRingGeometry.attributes.uv.setXY(i, uranusV3.length() < 2 ? 0 : 1, 1);
}
const uranusRingMaterial = new THREE.ShaderMaterial({
    uniforms: { uranusRingTexture: { value: uranusRingTexture } },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D uranusRingTexture;
        varying vec2 vUv;
        void main() {
            vec4 color = texture2D(uranusRingTexture, vUv);
            if (color.a < 0.1) discard;
            gl_FragColor = color;
        }
    `,
    transparent: true,
    side: THREE.DoubleSide
});
const uranusRing = new THREE.Mesh(uranusRingGeometry, uranusRingMaterial);
uranusRing.rotation.x = Math.PI / 2;

const uranusGroup = new THREE.Group();
uranusGroup.name = 'uranus' // ★ nom logique du groupe
uranusGroup.add(uranus);
uranusGroup.add(uranusRing);

// Neptune
let neptuneGeometry = new THREE.SphereGeometry(1.5, 60, 60)
let neptuneMaterial = new THREE.MeshPhongMaterial({
    map: neptuneTexture,
    normalScale: new THREE.Vector2(1.5, 1.5)
});
let neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial)
neptune.name = 'neptune'

// POSITIONS //
let sunTiltAngle = Math.PI * 26.3 / 180;

// sun
sun.position.y = - objectsDistance * 0
sun.position.x = 1.5
sun.rotation.z = sunTiltAngle

// mercury
mercury.position.y = - objectsDistance * 1
mercury.position.x = - 1.5

// venus
venus.position.y = - objectsDistance * 2
venus.position.x = 1.5
venus.rotation.y = 2

// earth and moon
let earthTiltAngle = Math.PI * 23.5 / 180
earthGroup.position.y = - objectsDistance * 3
earthGroup.position.x = - 1.5
earthGroup.rotation.z = earthTiltAngle
moon.position.set(2, 0, 0)

// mars
let marsTiltAngle = Math.PI * 25 / 180;
mars.position.y = - objectsDistance * 4
mars.position.x = 1.5
mars.rotation.z = marsTiltAngle

// jupiter
let jupiterTiltAngle = Math.PI * 25 / 180;
jupiter.position.y = - objectsDistance * 5
jupiter.position.x = -1.5
jupiter.rotation.z = jupiterTiltAngle // ★ correction (au lieu de mars.rotation)

// Saturne
let saturnTiltAngle = Math.PI * 23.44 / 180;
saturnGroup.position.y = - objectsDistance * 6
saturnGroup.position.x = 1.5
saturnGroup.rotation.z = saturnTiltAngle
ring.rotation.x = Math.PI / 2;

// Uranus
let uranusTiltAngle = Math.PI * 97.77 / 180;
uranusGroup.position.y = - objectsDistance * 7;
uranusGroup.position.x = -1.5;
uranusGroup.rotation.z = uranusTiltAngle;

// neptune
neptune.position.y = - objectsDistance * 8
neptune.position.x = 1.5
neptune.rotation.y = 2

if (isMobile) {
    console.log('mobile')
    sun.position.x = 0;
    mercury.position.x = 0;
    venus.position.x = 0;
    earthGroup.position.x = 0;
    mars.position.x = 0;
    jupiter.position.x = 0;
    saturnGroup.position.x = 0;
    uranusGroup.position.x = 0;
    neptune.position.x = 0;
} 
scene.add(sun, mercury, venus, earthGroup, mars, jupiter, saturnGroup, uranusGroup, neptune)
const sectionMeshes = [sun, mercury, venus, earthGroup, mars, jupiter, saturnGroup, uranusGroup, neptune]


/**
 * Particles
 */
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true,
    clippingPlanes: [
        new THREE.Plane(new THREE.Vector3(0, 0, -1), -0.1)
    ]
})

const particlesCount = 1500
const positions = new Float32Array(particlesCount * 3)
for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * (objectsDistance * sectionMeshes.length)
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}
const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Lights
 */
//  sun lights
const sunLight1 = new THREE.SpotLight('#ffffff', 15)
sunLight1.position.set(2.2, -1.4, 2)
sunLight1.distance = 3.5
sunLight1.near = 0
sunLight1.far = 3

const sunLight2 = new THREE.SpotLight('#ffffff', 10)
sunLight2.position.set(2.2, 1.4, 2)
sunLight2.distance = 3.5
sunLight2.near = 0
sunLight2.far = 3

// left planet light
planetLight.position.set(-1, 0, 0.65)
scene.add(sunLight1, sunLight2, planetLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

const camera = new THREE.PerspectiveCamera(
    isMobile ? 50 : 35,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.localClippingEnabled = true;

/**
 * Scroll
 */
let scrollY = window.scrollY
let currentSection = 0
window.addEventListener('scroll', () => {
    if (!isModalOpen) {
        scrollY = window.scrollY;
    }
});

/**
 * Cursor
 */
const cursor = { x: 0, y: 0 }
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
});

/**
 * Explications box (popups + overlay)
 */
const overlay = document.getElementById('modal-overlay');
let isModalOpen = false;
let frozenScrollY = 0;

function preventScroll() {
    isModalOpen = true;
    frozenScrollY = window.scrollY;
    scrollY = frozenScrollY;
    document.body.style.overflow = 'hidden';
}

function allowScroll() {
    isModalOpen = false;
    document.body.style.overflow = '';
}
function preventDefault(e) {
    // Vérifier si l'événement de défilement provient de la popup
    const infoBox = document.querySelector('.info-box.visible');
    if (infoBox && infoBox.contains(e.target)) {
        // Permettre le défilement à l'intérieur de la popup
        return;
    }
    e.preventDefault();
}

function showInfoBox(id) {
    hideAllInfoBoxes();
    const infoBox = document.getElementById(id);
    if (!infoBox) return;
    infoBox.classList.add('visible');
    overlay.classList.add('visible');
    preventScroll();
    // Accessibilité sans scroll auto (évite scrollIntoView)
    infoBox.setAttribute('tabindex', '-1');
    if (infoBox.focus) {
        try { infoBox.focus({ preventScroll: true }); } catch (_) { infoBox.focus(); }
    }
}

function hideAllInfoBoxes() {
    document.querySelectorAll('.info-box.visible').forEach(box => {
        box.classList.remove('visible');
    });
    overlay.classList.remove('visible');
    allowScroll();
}


// Prépare chaque popup : stop propagation + bouton de fermeture
document.querySelectorAll('.info-box').forEach(box => {

    box.addEventListener('click', e => e.stopPropagation());

    if (!box.querySelector('.close-btn')) {
        const btn = document.createElement('div');
        btn.className = 'close-btn';
        btn.setAttribute('aria-label', 'Fermer la fenêtre d’information');

        btn.addEventListener('click', e => {
            e.stopPropagation();
            hideAllInfoBoxes();
        });
        box.appendChild(btn);
    }
});

// Clic extérieur sur l’overlay => fermer
overlay.addEventListener('click', hideAllInfoBoxes);

// Touche Echap => fermer
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideAllInfoBoxes();
});

/**
 * Raycasting (clic sur planètes) — résolution par remontée des parents
 */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Les ids d'info disponibles (doivent correspondre aux ids HTML: info-XXX)
const INFO_KEYS = new Set(['sun', 'mercury', 'venus', 'earth', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']);

function findInfoKeyFromObject(obj) {
    let cur = obj;
    while (cur) {
        if (INFO_KEYS.has(cur.name)) return cur.name;
        cur = cur.parent;
    }
    return null;
}

window.addEventListener('click', (event) => {
    // si une popup est ouverte, on laisse l’overlay gérer la fermeture
    if (overlay.classList.contains('visible')) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // On cible toute la scène (en profondeur), mais on ignore les particules
    const intersects = raycaster.intersectObjects(scene.children, true)
        .filter(i => i.object.type !== 'Points');

    if (intersects.length > 0) {
        const clicked = intersects[0].object;
        const key = findInfoKeyFromObject(clicked);
        if (key) {
            hideAllInfoBoxes();
            showInfoBox(`info-${key}`);
        }
    }
});

/**
 * NEW: Curseur en "pointer" au survol d'une planète
 */
window.addEventListener('mousemove', (event) => {
    // Si une popup est ouverte, curseur par défaut
    if (overlay.classList.contains('visible')) {
        document.body.style.cursor = 'default';
        return;
    }

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // On ne teste que les planètes/groupes (sectionMeshes), pas les particules
    const over = raycaster.intersectObjects(sectionMeshes, true);

    document.body.style.cursor = over.length > 0 ? 'pointer' : 'default';
});

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

// Vitesse de rotation de la lune autour de la Terre
const moonRotationSpeed = 0.1;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    // LUNE
    const moonRotation = moonRotationSpeed * elapsedTime;
    moon.rotation.y = moonRotation;
    const moonOrbitSpeed = 0.05;
    const moonOrbitAngle = moonOrbitSpeed * elapsedTime;
    const moonOrbitRadius = 2;
    const moonPositionX = Math.cos(moonOrbitAngle) * moonOrbitRadius;
    const moonPositionZ = Math.sin(moonOrbitAngle) * moonOrbitRadius;
    moon.position.x = moonPositionX;
    moon.position.z = moonPositionZ;

    // Animation de la caméra
    camera.position.y = -scrollY / sizes.height * objectsDistance;

    const parallaxX = cursor.x;
    const parallaxY = -cursor.y;
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 3 * deltaTime;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 3 * deltaTime;

    // Animation des planètes
    sun.rotation.y += deltaTime * 0.03;
    mercury.rotation.y += deltaTime * 0.04;
    earth.rotation.y += deltaTime * 0.05;
    cloudMesh.rotation.y += deltaTime * 0.06;
    mars.rotation.y += deltaTime * 0.05;
    jupiter.rotation.y += deltaTime * 0.01;
    saturn.rotation.y += deltaTime * 0.03;
    neptune.rotation.y += deltaTime * 0.1; // Ajout de la rotation de Neptune

    // Rendu
    renderer.render(scene, camera);

    // Prochaine frame
    window.requestAnimationFrame(tick);
};
tick();


// 🎵 Contrôle audio
const bgMusic = document.getElementById("bg-music");
const playIcon = document.getElementById("audio-icon-play");
const pauseIcon = document.getElementById("audio-icon-pause");
const audioControl = document.getElementById("audio-control");

let isPlaying = false;

// Certains navigateurs bloquent l’autoplay → on déclenche après le premier clic
audioControl.addEventListener("click", () => {
    if (!isPlaying) {
        bgMusic.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
        isPlaying = true;
    } else {
        bgMusic.pause();
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
        isPlaying = false;
    }
});
