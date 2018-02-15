'use babel'

import plantuml from 'node-plantuml'
import grammar from '../lib/codemirror_grammar.min.js'
import codemirrorPuml from './codemirror/plantuml.js'
import Diagram from './component/diagram'
import plantumlPlugin from './remark/mdast/plantuml-plugin.js'
import svgHandler from './remark/mdast/hast/svg-handler.js'

const extend = require('xtend')

const { CodeMirror } = require('inkdrop')

let nailgun

module.exports = {

  activate () {
    if (!nailgun) {
      nailgun = plantuml.useNailgun()
    }
    const { MDEPreview } = inkdrop.components.classes
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.plantuml = Diagram
      MDEPreview.remarkCodeComponents.puml = Diagram
      // MDEPreview.remarkPlugins.push(plantumlPlugin)
      // MDEPreview.remarkReactOptions.toHast = { handlers: { svg: svgHandler } }
      // MDEPreview.remarkReactOptions.sanitize = extend(MDEPreview.remarkReactOptions.sanitize, { protocols: { src: ['http', 'https', 'data'] } })
      // MDEPreview.remarkReactOptions.sanitize = false
      // console.log(inkdrop.components.classes)
      // console.log(MDEPreview.getRemarkProcessor())
      // console.log(MDEPreview.remarkPlugins)
      // console.log(MDEPreview.remarkOptions)
      // console.log(MDEPreview.remarkReactOptions)
      // console.log(MDEPreview.remarkReactOptions.remarkReactComponents.code)
    }
    setLanguage()
  },

  deactivate () {
    if (nailgun) nailgun.shutdown()
    const { MDEPreview } = inkdrop.components.classes
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.plantuml = null
      MDEPreview.remarkCodeComponents.puml = null
      // MDEPreview.remarkPlugins = []
      // MDEPreview.remarkReactOptions.toHast = {}
    }
  }
}

function setLanguage () {
  const langs = ['plantuml', 'puml']
  const mode = grammar.getMode(codemirrorPuml)
  langs.forEach(lang => CodeMirror.defineMode(lang, mode))
  const togglecommentCmd = 'togglecomment_grammar_' + langs[0]
  CodeMirror.commands[togglecommentCmd] = function (cm) {
    cm.toggleComment(mode.options())
  }
}
