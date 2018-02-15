'use strict'

module.exports = svg

const parse5 = require('parse5')
const fromParse5 = require('hast-util-from-parse5')

/* Transform an svg. */
function svg (h, node) {
  var props = {src: 'https://goo.gl/5exTi1', alt: node.alt}

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title
  }

  if (!node.value) {
    return null
  }

  const ast = parse5.parse(node.value, {locationInfo: true})
  // console.log(ast)

  const hast = fromParse5(ast)
  // console.log(hast)

  const svg = hast.children[1].children[1].children[0]
  console.log(svg)

  return svg

  // console.log(h(svg, 'svg', {}))
  // return h(svg, 'svg', {})

  // return h(node, 'svg', props)
  // return h(node, 'img', props)
}
