//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, getState } from "uu5g04-hooks";
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
  },
  //@@viewOff:defaultProps
  render({ onSave, onCancel, subject }) {

    const [dis, setDis] = useState(false);
    const [supervisor, setSupervisor] = useState();


    //@@viewOn:render
 
    const degreeName = [
      { content: <UU5.Bricks.Lsi lsi={{ en: "Bachalor", cs: "Bakalářské" }} />, value: "bachelor" },
      { content: <UU5.Bricks.Lsi lsi={{ en: "Master", cs: "Magisterské" }} />, value: "master" },
    ];
    const languageOfStudy = [
      { content: <UU5.Bricks.Lsi lsi={{ en: "English", cs: "Anglický" }} />, value: "english" },
      { content: <UU5.Bricks.Lsi lsi={{ en: "Czech", cs: "Český" }} />, value: "czech" },
      { content: <UU5.Bricks.Lsi lsi={{ en: "Czech/English", cs: "Český/Anglický" }} />, value: "czech/english" },
    ];

    function _handleSupervisorOnBlur(opt) {
      if (/^[0-9]{1,4}-[0-9]{1,4}(-[0-9]{1,4}(-[0-9]{1,4})?)?$/g.test(opt.value)){
        setSupervisor(opt.value);
        console.log(opt);
        opt.component.setValueDefault(opt.value);
      ;}else if(opt.value!==""){alert("Please fill in Supervisor uuIdentity")}
    }
    function _handleSupervisorOnDelete() {
      setSupervisor("")
      setDis(false)
      
    }
    function _handleUpdate(subject) {
      return "Hello subject"
    }

    return (
      <UU5.Forms.ContextForm onSave={onSave} onCancel={onCancel}>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.Forms.Text
                borderRadius="8px"
                label={<UU5.Bricks.Lsi lsi={{ en: "Czech Name", cs: "Český Název" }} />}
                name="nameCs"
                value="Test one click"
                controlled={false}
                required
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.Forms.Text
                borderRadius="8px"
                label={<UU5.Bricks.Lsi lsi={{ en: "English Name", cs: "Anglický Název" }} />}
                name="nameEn"
                value="Test one click"
                controlled={false}
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
                controlled={false}
                value="2"
                required
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-5">
              <UU5.Forms.SwitchSelector
                borderRadius="8px"
                items={degreeName}
                label={<UU5.Bricks.Lsi lsi={{ en: "Type of study", cs: "Typ studia" }} />}
                name="degree"
                controlled={false}
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-5">
              <UU5.Forms.SwitchSelector
                borderRadius="8px"
                items={languageOfStudy}
                label={<UU5.Bricks.Lsi lsi={{ en: "Language", cs: "Jazyk" }} />}
                name="languageOfStudy"
                controlled={false}
              />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.RichText.EditorInput
                radius="8px"
                label={<UU5.Bricks.Lsi lsi={{ en: "Czech description", cs: "Český popis" }} />}
                name="descCs"
                value="Test one click"
                required
                controlled={false}
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.RichText.EditorInput
                // maxHeight = "106px"
                label={<UU5.Bricks.Lsi lsi={{ en: "English description", cs: "Anglický popis" }} />}
                name="descEn"
                value="Test one click"
                required
                controlled={false}
              />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <UU5.Bricks.Row display="flex">
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.Forms.Text
                borderRadius="8px"
                label={<UU5.Bricks.Lsi lsi={{ en: "Supervisor", cs: "Garant" }} />}
                name="supervisor"
                onBlur={_handleSupervisorOnBlur}
                disabled={dis}
                validate={/^[0-9]{1,4}-[0-9]{1,4}(-[0-9]{1,4}(-[0-9]{1,4})?)?$/}
                controlled={false}
                required
              />
            </UU5.Bricks.Column>
            {supervisor && (<UU5.Bricks.Column colWidth="s-6" style={{alignSelf: "flex-end"}}><Plus4U5.Bricks.BusinessCard uuIdentity={supervisor} visual={"micro"} /></UU5.Bricks.Column>)}
            </UU5.Bricks.Row>
          <UU5.Forms.Text
            borderRadius="8px"
            label={<UU5.Bricks.Lsi lsi={{ en: "Teachers", cs: "Učitelé" }} />}
            name="teachers"
            value="25-1622-1,24-9525-1"
            controlled={false}
          />
      </UU5.Forms.ContextForm>
    );
    //@@viewOff:render
  },
});

export default Form;
