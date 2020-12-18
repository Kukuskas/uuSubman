//@@viewOn:imports
import UU5, { Bricks } from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import "uu5g04-forms";
import "uu5g04-bricks";

//@@viewOff:imports

const Form = createVisualComponent({
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
  getInitialState() {
    return {
      size: "m",

    };
  },
  render({ onSave, onCancel }) {
    //@@viewOn:render
    const degreeName = [
      { content: <UU5.Bricks.Lsi lsi={{ en: "Bachalor", cs: "Bakalářské" }} />, value: "bachalor" },
      { content: <UU5.Bricks.Lsi lsi={{ en: "Master", cs: "Magisterské" }} />, value: "master" }
    ];
    const languageOfStudy = [
      { content: <UU5.Bricks.Lsi lsi={{ en: "Czech", cs: "  Český" }} />, value: "cs" },
      { content: <UU5.Bricks.Lsi lsi={{ en: "English", cs: "Anglický" }} />, value: "en" }
    ];
    return (
      <UU5.Forms.ContextForm onSave={onSave} onCancel={onCancel}>
        <UU5.Bricks.Container>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="s-6">

              <UU5.Forms.Text
                borderRadius="8px"
                label={<UU5.Bricks.Lsi lsi={{ en: "Czech Name", cs: "Český Název" }} />}
                name="nameCs"
                required
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.Forms.Text
                borderRadius="8px"
                label={<UU5.Bricks.Lsi lsi={{ en: "English Name", cs: "Anglický Název" }} />}
                name="nameEn"
                required
              />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="s-2">
              <UU5.Forms.Number
                placeholder="0"
                min={0}
                max={40}
                buttonHidden={true}
                borderRadius="8px"
                label={<UU5.Bricks.Lsi lsi={{ en: "Credits", cs: "Kredity" }} />}
                name="credits"
                required
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-5">
              <UU5.Forms.SwitchSelector
                borderRadius="8px"
                items={degreeName}
                label={<UU5.Bricks.Lsi lsi={{ en: "Type of study", cs: "Typ studia" }} />}
                name="degree"
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-5">
              <UU5.Forms.SwitchSelector
                borderRadius="8px"
                items={languageOfStudy}
                label={<UU5.Bricks.Lsi lsi={{ en: "Language", cs: "Jazyk" }} />}
                name="language"
              />
              
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.RichText.EditorInput
                radius="8px"
                label={<UU5.Bricks.Lsi lsi={{ en: "Czech description", cs: "Český popis" }} />}
                name="descCs"
                required
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.RichText.EditorInput
                // maxHeight = "106px"
                label={<UU5.Bricks.Lsi lsi={{ en: "English description", cs: "Anglický popis" }} />}
                name="descEn"
                required
              />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <UU5.Forms.Text
            borderRadius="8px"
            label={<UU5.Bricks.Lsi lsi={{ en: "Supervisor", cs: "Garant" }} />}
            name="supervisor"
            required
          />
          <UU5.Forms.Text
            borderRadius="8px"
            label={<UU5.Bricks.Lsi lsi={{ en: "Teachers", cs: "Učitelé" }} />}
            name="teachers"
          />
        </UU5.Bricks.Container>
      </UU5.Forms.ContextForm>
    );
    //@@viewOff:render
  },
});

export default Form;