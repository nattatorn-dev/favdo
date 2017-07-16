const isUrl = (url = '') => {
  const expression = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/
  const regex = new RegExp(expression)
  if (url.match(regex)) {
    return true
  }
  return false
}

export { isUrl }
