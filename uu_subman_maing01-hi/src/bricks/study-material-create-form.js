//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import "uu5g04-forms";
//@@viewOff:imports

const StudyMaterialCreateForm = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "StudyMaterialCreateForm",
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
    shown: false,
  },
  //@@viewOff:defaultProps

  render({ shown, onSave, onCancel, type }) {
    //@@viewOn:render

    return (
      
      <UU5.Forms.ContextModal
        shown={shown}
        size="l"
        header={
          <UU5.Forms.ContextHeader
            content={<UU5.Bricks.Lsi lsi={{ en: "Create a new study material", cs: "Vytvořit nový studijní materiál" }} />}
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
             <UU5.Forms.ContextForm onSave={onSave} onCancel={onCancel}  >
        <UU5.Bricks.Row>
          <UU5.Bricks.Column colWidth="s-6" >
            <UU5.Forms.Text
              borderRadius="8px"
              label="baseUri"
              name="baseUri"
              value="https://uuapp.plus4u.net/uu-bookkit-maing01/7f743efd1bf6486d8e72b27a0df92ba7/"
              required
            />
          </UU5.Bricks.Column>
          <UU5.Bricks.Column colWidth="s-6">
            <UU5.Forms.Text
              borderRadius="8px"
              label={<UU5.Bricks.Lsi lsi={{ en: "Name", cs: "Název" }} />}
              name="name"
              value=""
            />
          </UU5.Bricks.Column>
          <UU5.Bricks.Column colWidth="s-6">
            <UU5.Forms.Text
              borderRadius="8px"
              label={<UU5.Bricks.Lsi lsi={{ en: "Product Code", cs: "Kod Produktu" }} />}
              name="productCode"
              value="Product Code"
            />
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>
        <UU5.Forms.Text name="type" value={type} hidden={true} />
      </UU5.Forms.ContextForm>
      </UU5.Forms.ContextModal>
    );
    //@@viewOff:render
  },
});

export default StudyMaterialCreateForm;
