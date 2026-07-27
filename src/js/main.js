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

	document.addEventListener("keydown", (e) => {
		if (e.key !== "Escape") return

		const wrapper = document.querySelector(".onetrust-pc-dark-filter")
		if (!wrapper) return

		wrapper.classList.add("hidden!", "ot-fade-in")
	})
}

// Inits
document.addEventListener("DOMContentLoaded", () => {
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

	// Reviews slider
	const reviewsSwiper = new Swiper(".swiper-reviews", {
		// Optional parameters
		loop: true,
		spaceBetween: 80,
		slidesPerView: 1,
		breakpoints: {
			768: {
				enabled: false,
			},
		},
		// If we need pagination
		pagination: {
			el: ".swiper-pagination-reviews",
		},
	})

	// initCookieSettingsButton
	initCookieSettingsButton()
})
