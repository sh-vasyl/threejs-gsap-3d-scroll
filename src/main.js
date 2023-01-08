import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

createApp(App).mount('#app')

const video = document.querySelector('.bottle__video')

let tl = gsap.timeline({
	ease: 'none',
	scrollTrigger: {
		trigger: '.box',
		scrub: 1,
		pin: true,
		pinSpacing: true,
		end: '+=1000%',
		onUpdate: ({ progress }) => {
			const curFrame = (8 * progress).toFixed(4);
			requestAnimationFrame(() => video.currentTime = curFrame);
		},
	}
})
