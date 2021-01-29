//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, getState } from "uu5g04-hooks";
import Config from "./config/config";
import "uu5g04-forms";
import "uu5g04-bricks";

//@@viewOff:imports

const FormStudyMaterial = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectCreateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subject: UU5.PropTypes.shape({
      name: UU5.PropTypes.shape.isRequired,
      desc: UU5.PropTypes.shape.isRequired,
      id: UU5.PropTypes.isRequired,
    }),
    onSubmit: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes
  //@@viewOn:defaultProps
  defaultProps: {
    subject: null,
    onSubmit: () => {},
    onCancel: () => {},
    onSave: () => {},
  },
  //@@viewOff:defaultProps
  render({ onSave, onCancel, subject }) {


    //@@viewOn:render


    return (
      <UU5.Forms.ContextForm onSave={onSave} onCancel={onCancel}>
        <UU5.Bricks.Row>
          <UU5.Bricks.Column colWidth="s-6">
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
        </UU5.Bricks.Row>
        <UU5.Bricks.Row>
          <UU5.Bricks.Column colWidth="s-2">
            <UU5.Forms.Text
              borderRadius="8px"
              label="Type"
              name="type"
              value="16x9"
              required
            />
            </UU5.Bricks.Column>
        </UU5.Bricks.Row>
        <UU5.Bricks.Row>
          <UU5.Bricks.Column colWidth="s-2">
            <UU5.Forms.Text
              borderRadius="8px"
              label="Product Code"
              name="productCode"
              value="Books"
              required
            />
            </UU5.Bricks.Column>
        </UU5.Bricks.Row>
     
      </UU5.Forms.ContextForm>
    );
    //@@viewOff:render
  },
});

export default FormStudyMaterial;
