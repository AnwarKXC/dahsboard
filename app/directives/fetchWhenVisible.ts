interface HTMLElement {
  _fetchWhenVisibleObserver?: IntersectionObserver
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // Ensure this runs only on the client side
    if (import.meta.client) {
      const handler = binding.value

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handler() // Call the handler when the element is visible
          }
        })
      }, { rootMargin: '200px', threshold: 0 }) // Default options

      observer.observe(el as Element) // Start observing the element
      el._fetchWhenVisibleObserver = observer // Store the observer for cleanup
    }
  },
  unmounted(el: HTMLElement) {
    // Clean up the observer when the element is unmounted
    if (el._fetchWhenVisibleObserver) {
      el._fetchWhenVisibleObserver.unobserve(el as Element)
      delete el._fetchWhenVisibleObserver
    }
  },
}
