// Initialize accordion functionality
function initializeAccordion() {
	// Select the accordion container (assuming items are inside a common parent)
	const accordion = document.querySelector(".accordion")
	const accordionItems = document.querySelectorAll(".accordion-item")

	// Exit if no accordion container or items are found
	if (!accordion || !accordionItems.length) return

	// Set initial state for all accordion items
	accordionItems.forEach((item) => {
		const content = item.querySelector(".accordion-content")
		const trigger = item.querySelector(".accordion-trigger")

		if (!content || !trigger) return

		// Set ARIA attributes for accessibility
		trigger.setAttribute("aria-expanded", item.classList.contains("active"))
		content.setAttribute("aria-hidden", !item.classList.contains("active"))

		// Ensure content has active class if item is active
		if (item.classList.contains("active")) {
			content.classList.add("active")
		}
	})

	// Use event delegation for accordion triggers
	accordion.addEventListener("click", (event) => {
		const trigger = event.target.closest(".accordion-trigger")
		if (!trigger) return // Exit if not a trigger

		const parent = trigger.closest(".accordion-item")
		if (!parent) return // Exit if no parent item

		const content = parent.querySelector(".accordion-content")
		if (!content) return

		// Toggle active state
		const isOpening = !parent.classList.contains("active")
		parent.classList.toggle("active")
		content.classList.toggle("active")

		// Update ARIA attributes
		trigger.setAttribute("aria-expanded", isOpening)
		content.setAttribute("aria-hidden", !isOpening)

		// Optional: Close other items if only one should be open
		/*
		if (isOpening) {
			document.querySelectorAll(".accordion-item").forEach((otherItem) => {
				if (otherItem !== parent && otherItem.classList.contains("active")) {
					otherItem.classList.remove("active");
					const otherContent = otherItem.querySelector(".accordion-content");
					const otherTrigger = otherItem.querySelector(".accordion-trigger");
					if (otherContent && otherTrigger) {
						otherContent.classList.remove("active");
						otherTrigger.setAttribute("aria-expanded", "false");
						otherContent.setAttribute("aria-hidden", "true");
					}
				}
			});
		}
		*/
	})

	// Add keyboard support for accessibility
	accordion.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.key === " ") {
			const trigger = event.target.closest(".accordion-trigger")
			if (!trigger) return

			event.preventDefault() // Prevent default scrolling for spacebar
			trigger.click() // Simulate click to reuse logic
		}
	})
}
// Initialize tabs & slider functionality
function initResponsiveSwiperTabs(containerEl) {
	const triggers = containerEl.querySelectorAll(".tabs-header .tab-trigger")
	const panels = containerEl.querySelectorAll(".tabs-content .tab-content")

	const nextEl = containerEl.querySelector(".swiper-tabs-visibility-next")
	const prevEl = containerEl.querySelector(".swiper-tabs-visibility-prev")

	if (!triggers.length || !panels.length) return

	let swiperInstance = null
	const maxWidth = "(max-width: 1024px)"
	const mediaQuery = window.matchMedia(maxWidth)

	let currentIndex = 0

	function updateUI(activeIndex) {
		currentIndex = activeIndex

		triggers.forEach((t, i) => {
			const active = i === activeIndex
			t.setAttribute("aria-selected", active)
			t.setAttribute("tabindex", active ? "0" : "-1")
			t.classList.toggle("active", active)
		})

		panels.forEach((p, i) => {
			const active = i === activeIndex
			p.classList.toggle("hidden", !active)
			p.setAttribute("aria-hidden", !active)
		})
	}

	function handleBreakpoint(e) {
		if (e.matches) {
			if (!swiperInstance) {
				swiperInstance = new Swiper(containerEl, {
					slidesPerView: 1,
					initialSlide: currentIndex,
					navigation: { nextEl, prevEl },
					loop: true,
					effect: "fade",
					fadeEffect: {
						crossFade: true,
					},
					on: {
						slideChange: function () {
							updateUI(this.realIndex)
						},
					},
				})
			}
		} else {
			if (swiperInstance) {
				swiperInstance.destroy(true, true)
				swiperInstance = null

				updateUI(currentIndex)
			}
		}
	}

	triggers.forEach((trigger, index) => {
		const handleActivation = () => {
			if (swiperInstance) {
				swiperInstance.slideToLoop(index)
			} else {
				updateUI(index)
			}
		}

		trigger.addEventListener("click", handleActivation)

		trigger.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault()
				handleActivation()
			} else if (e.key === "ArrowRight") {
				e.preventDefault()
				const nextIndex = (index + 1) % triggers.length
				if (swiperInstance) swiperInstance.slideToLoop(nextIndex)
				else updateUI(nextIndex)
				triggers[nextIndex].focus()
			} else if (e.key === "ArrowLeft") {
				e.preventDefault()
				const prevIndex = (index - 1 + triggers.length) % triggers.length
				if (swiperInstance) swiperInstance.slideToLoop(prevIndex)
				else updateUI(prevIndex)
				triggers[prevIndex].focus()
			}
		})
	})

	mediaQuery.addEventListener("change", handleBreakpoint)
	handleBreakpoint(mediaQuery)

	updateUI(currentIndex)
}

// Initialize CoocieSettingsButton
function initCookieSettingsButton() {
	const btn = document.querySelector(".ot-sdk-show-settings-custom")
	if (!btn) return

	btn.addEventListener("click", () => {
		const closeBtn = document.querySelector("#close-pc-btn-handler")
		const wrapper = document.querySelector(".onetrust-pc-dark-filter")
		if (!wrapper || !closeBtn) return

		wrapper.classList.remove("hidden!", "ot-fade-in")

		closeBtn.addEventListener("click", () => {
			wrapper.classList.add("hidden!", "ot-fade-in")
		})
	})
}

// Inits
document.addEventListener("DOMContentLoaded", () => {
	// FAQ Accordion
	// initializeAccordion()

	// Tabs & Slider
	// document
	// 	.querySelectorAll(".tabs.swiper-tabs-visibility")
	// 	.forEach((container) => {
	// 		initResponsiveSwiperTabs(container)
	// 	})

	// Trusted By Slider
	const trustedBySwiper = new Swiper(".swiper-trusted-by", {
		// Optional parameters
		loop: true,
		speed: 3000,
		spaceBetween: 40,
		autoplay: {
			delay: 0,
		},
		breakpoints: {
			320: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 4,
			},
			1024: {
				slidesPerView: 5,
			},
			1280: {
				slidesPerView: 6,
			},
		},
	})

	// Track billing operation slider
	const trackBillingOperationSwiper = new Swiper(
		".swiper-track-billing-operation",
		{
			// Optional parameters
			loop: true,
			spaceBetween: 40,
			slidesPerView: 1,
			breakpoints: {
				768: {
					enabled: false,
				},
			},
			// If we need pagination
			pagination: {
				el: ".swiper-pagination-track-billing-operation",
			},
		},
	)

	// Teams
	// const teamsSwiper = new Swiper(".swiper-teams", {
	// 	// Optional parameters
	// 	loop: true,
	// 	spaceBetween: 24,

	// 	breakpoints: {
	// 		320: {
	// 			slidesPerView: 1.1,
	// 		},

	// 		640: {
	// 			slidesPerView: 1.9,
	// 		},
	// 		992: {
	// 			slidesPerView: 2,
	// 		},
	// 		1280: {
	// 			slidesPerView: 3,
	// 		},
	// 	},
	// })

	// Swiper Team
	// const swiperTeam = new Swiper(".swiper-team", {
	// 	centeredSlides: false,
	// 	loop: true,

	// 	navigation: {
	// 		nextEl: ".swiper-team-next",
	// 		prevEl: ".swiper-team-prev",
	// 	},

	// 	breakpoints: {
	// 		320: {
	// 			slidesPerView: 1,
	// 			spaceBetween: 16,
	// 			slidesOffsetBefore: 36,
	// 			slidesOffsetAfter: 36,
	// 		},
	// 		769: {
	// 			slidesPerView: 2,
	// 			spaceBetween: 20,
	// 			slidesOffsetBefore: 64,
	// 			slidesOffsetAfter: 64,
	// 		},
	// 		1280: {
	// 			slidesPerView: 2,
	// 			spaceBetween: 24,
	// 			slidesOffsetBefore: 85,
	// 			slidesOffsetAfter: 85,
	// 		},
	// 	},
	// })

	// Swiper Tools
	// const swiperToolsFirst = new Swiper(".swiper-tools-first", {
	// 	loop: true,
	// 	speed: 5000,
	// 	slidesPerView: "auto",
	// 	spaceBetween: 56,
	// 	freeMode: {
	// 		enabled: true,
	// 		momentum: false,
	// 		sticky: false,
	// 	},

	// 	autoplay: {
	// 		delay: 0,
	// 		reverseDirection: false,
	// 	},
	// })
	// const swiperToolsSecond = new Swiper(".swiper-tools-second", {
	// 	loop: true,
	// 	speed: 5000,
	// 	slidesPerView: "auto",
	// 	spaceBetween: 56,

	// 	autoplay: {
	// 		delay: 0,
	// 		reverseDirection: true,
	// 	},
	// })
	// const swiperToolsThird = new Swiper(".swiper-tools-third", {
	// 	loop: true,
	// 	speed: 5000,
	// 	slidesPerView: "auto",
	// 	spaceBetween: 56,
	// 	freeMode: {
	// 		enabled: true,
	// 		momentum: false,
	// 		sticky: false,
	// 	},

	// 	autoplay: {
	// 		delay: 0,
	// 		reverseDirection: false,
	// 	},
	// })

	// initCookieSettingsButton
	// initCookieSettingsButton()
})
// document.querySelector(".nav-unread-placeholder").innerHTML = "5"
// document.querySelector(".nav-unread-placeholder").style.dispaly = "flex"
// document.querySelector(".nav-unread-placeholder").style.background = "#eb4747"
