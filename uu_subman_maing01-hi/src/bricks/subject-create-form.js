//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import "uu5g04-forms";
//@@viewOff:imports

const SubjectCreateForm = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectCreateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSubmit: () => {},
    onCancel: () => {}
  },
  //@@viewOff:defaultProps

  render({ onSave, onCancel }) {
    //@@viewOn:render
    return (
        <UU5.Forms.Form onSave={onSave} onCancel={onCancel} labelColWidth="xs-12 m-1" inputColWidth="xs-12 m-11">
          <UU5.Forms.Text label="Title" name="name" />
          <UU5.Forms.Text label="Text" name="text" />
          <UU5.Forms.Controls />
        </UU5.Forms.Form>
      );
    //@@viewOff:render
  }
});

export default SubjectCreateForm;