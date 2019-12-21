export default ({ store, app }, inject) => {
  // /////////////////////////////////////////////////////////// Get Single Menu
  // ---------------------------------------------------------------------------
  inject('getMenu', (menuName) => {
    const navigationList = store.getters['navigation/navigationList']
    if (!Array.isArray(navigationList)) { return false }
    const menu = store.getters['navigation/navigationList'].find(({ name }) => name === menuName)
    if (menu) { return menu }
    return false
  })
  // ////////////////////////////////////////////////////// Get Single Meta Item
  // ---------------------------------------------------------------------------
  inject('getMetaItem', (obj, metaItemName) => {
    const metadata = obj.metadata
    if (metadata) {
      const metaItem = metadata[metaItemName]
      if (metaItem) { return metaItem }
      return false
    }
    return 'This item does not have any Metadata.'
  })
  // /////////////////////////////////////////////////////////////// Parse a URL
  // ----------------- https://www.abeautifulsite.net/parsing-urls-in-javascript
  inject('parseURL', (url) => {
    const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
    const urlBreakdown = {}
    let hostname = null
    let domain = null
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      hostname = match[2]
    }
    const urlParts = hostname.split('.').reverse()
    if (urlParts != null && urlParts.length > 1) {
      domain = urlParts[1] + '.' + urlParts[0]
      if (hostname.toLowerCase().includes('.co.uk') !== -1 && urlParts.length > 2) {
        domain = urlParts[2] + '.' + domain
      }
    }
    urlBreakdown.hostname = hostname
    urlBreakdown.domain = domain
    return urlBreakdown
  })
  // ////////////////////////////////////////////////////// Throttle From Lodash
  // ---------------------------------------------------------------------------
  inject('throttle', (func, wait, options) => {
    let context
    let args
    let result
    let timeout = null
    let previous = 0
    if (!options) { options = {} }
    const later = function () {
      previous = options.leading === false ? 0 : Date.now()
      timeout = null
      result = func.apply(context, args)
      if (!timeout) { context = args = null }
    }
    return function () {
      const now = Date.now()
      if (!previous && options.leading === false) { previous = now }
      const remaining = wait - (now - previous)
      context = this
      args = arguments
      if (remaining <= 0 || remaining > wait) {
        if (timeout) { clearTimeout(timeout); timeout = null }
        previous = now
        result = func.apply(context, args)
        if (!timeout) { context = args = null }
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
      } return result
    }
  })
  // ///////////////////////////////////////// Check if Element contains a class
  // ---------------------------------------------------------------------------
  inject('hasClass', (element, className) => {
    if (element.classList) { return element.classList.contains(className) }
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className)
  })
}
