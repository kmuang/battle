import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import Grid from './CoC/Grid.js'
import BaseLayout from './CoC/BaseLayout.js'
import Environment from './CoC/Environment.js'
import Troops from './CoC/Troops.js'
import Projectiles from './CoC/Projectiles.js'
import AudioManager from './CoC/Audio.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#87CEEB')

/**
 * Audio
 */
const audioManager = new AudioManager()
window.addEventListener('click', () => {
  audioManager.resume()
})

/**
 * World
 */
const grid = new Grid(scene)
const baseLayout = new BaseLayout(scene, audioManager)
const environment = new Environment(scene)
const projectiles = new Projectiles(scene)
const troops = new Troops(scene, baseLayout.buildingsList, audioManager)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#ffffff', 0.6)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff', 1.2)
directionalLight.position.set(10, 20, 10)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
directionalLight.shadow.camera.near = 0.1
directionalLight.shadow.camera.far = 50
directionalLight.shadow.camera.left = -30
directionalLight.shadow.camera.right = 30
directionalLight.shadow.camera.top = 30
directionalLight.shadow.camera.bottom = -30
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  const aspect = sizes.width / sizes.height
  const frustumSize = 40
  camera.left = -frustumSize * aspect / 2
  camera.right = frustumSize * aspect / 2
  camera.top = frustumSize / 2
  camera.bottom = -frustumSize / 2

  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera (Isometric / Orthographic)
 */
const aspect = sizes.width / sizes.height
const frustumSize = 40
const camera = new THREE.OrthographicCamera(
  frustumSize * aspect / - 2,
  frustumSize * aspect / 2,
  frustumSize / 2,
  frustumSize / - 2,
  1,
  1000
)

// Isometric angle
camera.position.set(20, 20, 20)
camera.lookAt(0, 0, 0)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableRotate = true // Lock rotation for true isometric feel? Or allow it?
// Let's allow rotation but keep it isometric-ish
controls.maxPolarAngle = Math.PI / 2.5 // Don't go too low

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update Battle
  troops.update(projectiles, audioManager)
  baseLayout.update(troops.troops, projectiles, audioManager)
  projectiles.update()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
