import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import model from '/human_skull.glb'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

createApp(App).mount('#app')


/**
 * CANVAS
 */

const canvas = document.querySelector('.webgl')

/**
 * SCENE
 */

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff);

/**
 * LOADER
 */
const loader = new GLTFLoader();
loader.load(model, (gltf) => {
	scene.add(gltf.scene)

	gltf.scene.rotation.y = 3.14

	gsap.to(canvas, {
		ease: 'none',
		scrollTrigger: {
			trigger: canvas,
			markers: true,
			pin: true,
			end: '+=500%',
			scrub: 2,
			onUpdate: (self) => {
				gltf.scene.rotation.y = 2 * 3.14 * self.progress
			}
		}
	})
})

/**
 * SIZES
 */

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

/**
 * CAMERA
 */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

/**
 * RENDER
 */

const renderer = new THREE.WebGLRenderer({
	canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const render = () => {
	renderer.render(scene, camera)
	window.requestAnimationFrame(render)
}
render()

/**
 * RESIZE
 */

window.addEventListener('resize', () => {
	// Update size
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	// Update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	// Update render
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})






