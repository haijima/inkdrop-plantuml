'use babel'

import plantuml from 'node-plantuml'
const visit = require('unist-util-visit')
const base64 = require('base64-stream')

export default function () {
  return function transformer (ast, vFile, next) {
    if (typeof next === 'function') {
      visitCodeBlock(ast, vFile, next)
    } else {
      visitCodeBlock(ast, vFile)
      return ast
    }
  }
}

function visitCodeBlock (ast, vFile, next) {
  let counter = 0
  function countUp () {
    counter++
  }
  function countDown () {
    if (--counter <= 0 && next) next(null, ast, vFile)
  }

  // TODO:  一度もcountUpされない時、nextが呼ばれない
  return visit(ast, 'code', async (node, index, parent) => {
    let {lang, value, position} = node
    if (!['plantuml', 'puml'].includes(lang)) return node

    countUp()
    // const base64 = await createUmlBase64(value).catch(err => err)
    // if (typeof base64 === 'string') {
    //   parent.children.splice(index, 1, {
    //     type: 'image',
    //     title: 'UML diagram',
    //     url: 'data:image/png;base64,' + base64
    //   })
    // } else {
    //   vFile.message(base64, position, 'inkdrop-plantuml')
    // }
    const svg = await createUmlSvg(value).catch(err => err)
    if (typeof svg === 'string') {
      parent.children.splice(index, 1, {
        type: 'svg',
        title: 'UML diagram',
        value: svg
      })
    } else {
      vFile.message(base64, position, 'inkdrop-plantuml')
    }
    countDown()
    return node
  })
}

function createUmlBase64 (source) {
  return new Promise((resolve, reject) => {
    try {
      const svg = plantuml.generate(source, { format: 'png' })
      let chunks = []
      let encoded = svg.out.pipe(base64.encode())
      encoded.on('data', chunk => chunks.push(chunk))
      encoded.on('end', () => resolve(Buffer.concat(chunks).toString()))
    } catch (error) { reject(error) }
  })
}

function createUmlSvg (source) {
  return new Promise((resolve, reject) => {
    try {
      const svg = plantuml.generate(source, { format: 'svg' })
      let chunks = []
      svg.out.on('data', chunk => chunks.push(chunk))
      svg.out.on('end', () => resolve(Buffer.concat(chunks).toString()))
    } catch (error) { reject(error) }
  })
}
