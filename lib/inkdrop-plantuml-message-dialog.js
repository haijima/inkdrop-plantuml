'use babel';

import { React } from 'inkdrop';
import { CompositeDisposable } from 'inkdrop';

export default class InkdropPlantumlMessageDialog extends React.Component {

  componentWillMount () {
    // Events subscribed to in Inkdrop's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this dialog
    this.subscriptions.add(inkdrop.commands.add(document.body, {
      'inkdrop-plantuml:toggle': () => this.toggle()
    }));
  }

  componentWillUnmount () {
    this.subscriptions.dispose();
  }

  render() {
    const { MessageDialog } = inkdrop.components.classes;
    return (
      <MessageDialog ref='dialog' title='InkdropPlantuml'>
        InkdropPlantuml was toggled!
      </MessageDialog>
    );
  }

  toggle() {
    console.log('InkdropPlantuml was toggled!');
    const { dialog } = this.refs;
    if (!dialog.isShown) {
      dialog.showDialog();
    } else {
      dialog.dismissDialog();
    }
  }
}
