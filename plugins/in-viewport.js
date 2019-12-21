export default ({ store, app }, inject) => {
  // ///////////////////////////////// Check if Element is fully in the viewport
  // ---------------------------------------------------------------------------
  inject('isInViewport', (element, scrollTop, viewportTop, viewportBottom, offset) => {
    const elementRect = element.getBoundingClientRect()
    const elementTop = elementRect.top + scrollTop + offset
    const elementHeight = element.offsetHeight || element.clientHeight
    const elementBottom = elementTop + elementHeight
    if (elementBottom >= viewportTop && elementTop < viewportBottom) { return true }
    return false
  })
  // //////////////////////////////////////////////////////// Update positioning
  // ---------------------------------------------------------------------------
  inject('inViewportUpdate', (instance, elements, inViewportClass, offset, next) => {
    const viewportTop = window.pageYOffset || document.documentElement.scrollTop
    const viewportBottom = viewportTop + (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const len = elements.length
    let visible = []
    for (let i = 0; i < len; i++) {
      const element = elements[i]
      if (instance.$isInViewport(element, scrollTop, viewportTop, viewportBottom, offset) === true) {
        if (!instance.$hasClass(element, inViewportClass)) {
          element.classList.add(inViewportClass)
        }
        visible.push(element.id)
      } else {
        if (instance.$hasClass(element, inViewportClass)) {
          element.classList.remove(inViewportClass)
        }
      }
    }
    const visibleElementID = visible.slice(-1).pop()
    visible = []
    return next(visibleElementID)
  })
}
