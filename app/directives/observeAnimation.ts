export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { speed = 1000, number = 0 } = binding.value

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateElement(el, 0, Number(number), Number(speed))
          observer.unobserve(el)
        }
      })
    })

    observer.observe(el)
  },
}

function animateElement(element: HTMLElement, start: number, end: number, duration: number) {
  let startTimestamp: number | null = null

  const step = (timestamp: number) => {
    if (!startTimestamp)
      startTimestamp = timestamp
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    const value = Math.floor(start + progress * (end - start))
    element.textContent = value.toString()

    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }

  window.requestAnimationFrame(step)
}
