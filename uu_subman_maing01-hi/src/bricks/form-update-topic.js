//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import "uu5g04-forms";
import "uu5g04-bricks";

//@@viewOff:imports

const FormUpdateTopic = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "FormUpdateTopic",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    topic: UU5.PropTypes.shape({
      name: UU5.PropTypes.string,
      desc: UU5.PropTypes.string.isRequired,
      studyMaterialList: UU5.PropTypes.array,
      id: UU5.PropTypes.isRequired,
    }),
    onSubmit: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    topic: {}, 
    onSubmit: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps
  getInitialState() {
    return {
      size: "m",
    };
  },

  render({ onSave, onCancel, topic, id, language, formOfStudy }) {
    //@@viewOn:render
    console.log("+++++++topic+++++++++++");
    console.log(topic);
    return (
      <UU5.Forms.ContextForm onSave={onSave} onCancel={onCancel}>
        <UU5.Bricks.Container>
          <UU5.Forms.Text
            borderRadius="8px"
            label={<UU5.Bricks.Lsi lsi={{ en: "Edit Name", cs: "Upravit Téma" }} />}
            name="name"
            value={topic.name}
          />
          <UU5.Forms.Text
            borderRadius="8px"
            label={<UU5.Bricks.Lsi lsi={{ en: "Edit Description", cs: "Upravit Popis" }} />}
            name="desc"
            value={topic.desc}
            required
          />

          <UU5.Forms.Text name="language" value={language} hidden={true} />
          <UU5.Forms.Text name="formOfStudy" value={formOfStudy} hidden={true} />

        </UU5.Bricks.Container>
      </UU5.Forms.ContextForm>
    );
    //@@viewOff:render
  },
});

export default FormUpdateTopic;
