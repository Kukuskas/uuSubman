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
        < UU5.Bricks.Modal size="l" sticky="true" shown={true}>
             <UU5.Forms.Form colorSchema="grey" onSave={onSave} onCancel={onCancel} labelColWidth="xs-12 m-1" inputColWidth="xs-12 m-11" >
           
             <UU5.Bricks.Text content = "Name:" />
             <UU5.Forms.Text  borderRadius="8px" label = "Czech" name = "nameCs" />
           <UU5.Forms.Text borderRadius="8px" label = "English" name = "nameEn" />
           
           <UU5.Forms.Number min={0} max={40} buttonHidden={true} borderRadius="8px" label = "Credits" name = "credits"/>
          <UU5.Forms.Text borderRadius="8px" label = "Description" name = "desc" />
          <UU5.Forms.Controls />
          
        </UU5.Forms.Form>
        </ UU5.Bricks.Modal>
      );
    //@@viewOff:render
  }
});

export default SubjectCreateForm;