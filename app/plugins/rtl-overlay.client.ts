export default defineNuxtPlugin(() => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && (node as HTMLElement).classList.contains('p-component')) {
          const htmlEl = document.documentElement
          if (htmlEl.getAttribute('dir') === 'rtl') {
            try {
              const overlay = node as HTMLElement
              const startValue = overlay.style.insetInlineStart
              if (startValue) {
                overlay.style.insetInlineEnd = startValue
                overlay.style.insetInlineStart = 'auto'
              }
            }
            catch (error) {
              console.error('Error adjusting RTL styles:', error)
            }
          }
        }
      })
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })

  // Cleanup function to disconnect the observer
  return {
    onUnmount() {
      observer.disconnect()
    },
  }
})
