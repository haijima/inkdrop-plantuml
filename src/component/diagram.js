'use babel'

import fs from 'fs'
import { React } from 'inkdrop'
import { remote } from 'electron'
import plantuml from 'node-plantuml'

export default class Diagram extends React.Component {
  constructor () {
    super()
    this.codeCache = ''
  }

  componentDidMount () {
    this.renderDiagram()
    inkdrop.commands.add(this.refs.canvas, 'inkdrop-plantuml:save-as-image', () => {
      this.saveAsImage()
    })
    inkdrop.commands.add(this.refs.canvas, 'inkdrop-plantuml:save-as-svg', () => {
      this.saveAsSvg()
    })
  }

  componentDidUpdate () {
    this.renderDiagram()
  }

  render () {
    return <div className='inkdrop-plantuml' ref='canvas' />
  }

  renderDiagram () {
    const code = this.props.children[0]
    if (this.codeCache === code) return
    this.codeCache = code

    const diagram = plantuml.generate(code, { format: 'svg' })
    this.refs.canvas.innerHTML = ''
    const chunks = []
    diagram.out.on('data', chunk => chunks.push(chunk))
    diagram.out.on('end', () => {
      this.refs.canvas.innerHTML = Buffer.concat(chunks).toString()
    })
  }

  saveAsImage () {
    const filters = [{ name: '.png', extensions: ['png'] }]
    this.saveAs(filters)
  }

  saveAsSvg () {
    const filters = [{ name: '.svg', extensions: ['svg'] }]
    this.saveAs(filters)
  }

  saveAs (filters) {
    const savePath = remote.dialog.showSaveDialog({
      title: 'UMLを保存',
      filters: filters
    })
    if (!savePath) return
    const code = this.props.children[0]
    const extension = savePath.substr(savePath.lastIndexOf('.') + 1)
    const diagram = plantuml.generate(code, { format: extension })
    const fileStream = fs.createWriteStream(savePath)
    diagram.out.pipe(fileStream)
  }
}
