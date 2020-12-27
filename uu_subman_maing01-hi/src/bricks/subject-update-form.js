//@@viewOn:imports
import UU5, { Bricks } from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import "uu5g04-forms";
import Form from "./form";
//@@viewOff:imports

const SubjectUpdateForm = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectCreateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSubmit: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render({ onSave, onCancel }) {
    //@@viewOn:render
    return (
      <UU5.Bricks.Container>
        <UU5.Forms.ContextModal size="l" shown={true}>
          <UU5.Forms.ContextHeader
            content={<UU5.Bricks.Lsi lsi={{ en: "Update the subject", cs: "Upravit předmět" }} />}
            info={<UU5.Bricks.Lsi lsi={{ cs: <UU5.Bricks.Paragraph style="margin: 0" />, en: "More info..." }} />}
          />
          <UU5.Forms.ContextForm onSave={onSave} onCancel={onCancel}>
            <Form />
            <UU5.Forms.ContextControls
              buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={{ en: "Uložit", cs: "Save" }} /> }}
              buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={{ en: "Cancel", cs: "Zrušit" }} /> }}
            />
          </UU5.Forms.ContextForm>
        </UU5.Forms.ContextModal>
      </UU5.Bricks.Container>
    );
    //@@viewOff:render
  },
});
