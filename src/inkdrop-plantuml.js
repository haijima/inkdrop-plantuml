'use babel'

import Diagram from './diagram'
import plantuml from 'node-plantuml'

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
    }
  },

  deactivate () {
    if (nailgun) nailgun.shutdown()
    const { MDEPreview } = inkdrop.components.classes
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.plantuml = null
      MDEPreview.remarkCodeComponents.puml = null
    }
  }

}
