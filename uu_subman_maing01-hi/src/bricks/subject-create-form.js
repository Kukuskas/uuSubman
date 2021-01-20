//@@viewOn:imports
import UU5, { Bricks } from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import "uu5g04-forms";
import Form from "./form";
//@@viewOff:imports

const SubjectCreateForm = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectCreateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSave: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
    shown: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSave: () => {},
    onCancel: () => {},
    shown: false
  },
  //@@viewOff:defaultProps

  render({ shown, onSave, onCancel }) {
    //@@viewOn:render
    return (
        <UU5.Forms.ContextModal 
          shown={shown} 
          size="l" 
          header={
            <UU5.Forms.ContextHeader
            content={<UU5.Bricks.Lsi lsi={{ en: "Create a new subject", cs: "Vytvořit nový předmět" }} />}
            info={<UU5.Bricks.Lsi lsi={{ cs: "Více informací...", en: "More info..." }} />}
            />
          }
          footer={
            <UU5.Forms.ContextControls
            buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={{ en: "Create", cs: "Vytvořit" }} /> }}
            buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={{ en: "Cancel", cs: "Zrušit" }} /> }}
          />
          }
        >
          <Form onSave={onSave} onCancel={onCancel}/>
          
        </UU5.Forms.ContextModal>
    );
    //@@viewOff:render
  },
});

export default SubjectCreateForm;
