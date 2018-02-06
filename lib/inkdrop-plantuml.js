'use babel';

import InkdropPlantumlMessageDialog from './inkdrop-plantuml-message-dialog';

module.exports = {

  activate() {
    inkdrop.components.registerClass(InkdropPlantumlMessageDialog);
    inkdrop.layouts.addComponentToLayout('modals', 'InkdropPlantumlMessageDialog');
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout('modals', 'InkdropPlantumlMessageDialog');
    inkdrop.components.deleteClass(InkdropPlantumlMessageDialog);
  }

};
