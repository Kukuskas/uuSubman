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
  getInitialState() {
    return {
      size: "m",
    };
  },
  render({ onSave, onCancel, subject }) {
    //@@viewOn:render
    console.log(subject);
    const degreeName = [
      { content: <UU5.Bricks.Lsi lsi={{ en: "Bachalor", cs: "Bakalářské" }} />, value: "bachelor" },
      { content: <UU5.Bricks.Lsi lsi={{ en: "Master", cs: "Magisterské" }} />, value: "master" },
    ];
    const languageOfStudy = [
      { content: <UU5.Bricks.Lsi lsi={{ en: "Czech", cs: "  Český" }} />, value: "cs" },
      { content: <UU5.Bricks.Lsi lsi={{ en: "English", cs: "Anglický" }} />, value: "en" },
    ];

    function _handleSupervisorOnBlur(opt) {
      if(/^[0-9]{1,4}-[0-9]{1,4}(-[0-9]{1,4}(-[0-9]{1,4})?)?$/g.test(opt.value)){setSupervisorValue(opt.value);
      setSupervisor(
        <>
          <Plus4U5.Bricks.UserData uuIdentity={opt.value} detail={true} visible="all">
            {({ isLoading, data }) => {
              if (isLoading) {
                return <UU5.Bricks.Loading />;
              } else {
                if(data.name) {setDis(true); 
                  return (
                  <>
                    <UU5.Bricks.Row>
                    <Plus4U5.Bricks.UserPhoto width="80px" uuIdentity={opt.value} />{data.title} {data.name} {data.suffix}
                      <UU5.Bricks.Button onClick={_handleSupervisorOnDelete} size="s" bgStyle="transparent" borderRadius="800px" className="uu5-common-center">
                        <UU5.Bricks.Icon icon="fa-times" />
                      </UU5.Bricks.Button>
                    </UU5.Bricks.Row>
                  </>
                );
              }else{setDis(false); return <UU5.Bricks.Text color="red">UuIdentity doesn't exist!</UU5.Bricks.Text>  }}
            }}
          </Plus4U5.Bricks.UserData>
        </>
      );
      ;}else if(opt.value!==""){alert("Please fill in Supervisor uuIdentity")}
    }
    function _handleSupervisorOnDelete() {
      setSupervisor("")
      setDis(false)
      
    }
    function _handleUpdate(subject) {
      return "Hello subject"
    }
    //const [subjectUpdate, setSubjectUpdate] = useState(subject)
    const [supervisorValue, setSupervisorValue] = useState("");
    const [dis, setDis] = useState(false);
    const [supervisor, setSupervisor] = useState("");

    return (
      <UU5.Forms.ContextForm onSave={onSave} onCancel={onCancel}>
        <UU5.Bricks.Container>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.Forms.Text
                borderRadius="8px"
                label={<UU5.Bricks.Lsi lsi={{ en: "Czech Name", cs: "Český Název" }} />}
                name="nameCs"
                value="Test one click"
                required
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.Forms.Text
                borderRadius="8px"
                label={<UU5.Bricks.Lsi lsi={{ en: "English Name", cs: "Anglický Název" }} />}
                name="nameEn"
                value="Test one click"
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
                value="Test one click"
                required
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.RichText.EditorInput
                // maxHeight = "106px"
                label={<UU5.Bricks.Lsi lsi={{ en: "English description", cs: "Anglický popis" }} />}
                name="descEn"
                value="Test one click"
                required
              />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <UU5.Forms.Text
            borderRadius="8px"
            label={<UU5.Bricks.Lsi lsi={{ en: "Supervisor", cs: "Garant" }} />}
            name="supervisor"
            onBlur={_handleSupervisorOnBlur}
            disabled={dis}
            value={supervisorValue}
            validate={/^[0-9]{1,4}-[0-9]{1,4}(-[0-9]{1,4}(-[0-9]{1,4})?)?$/}
            required
          />
          <UU5.Bricks.Section content={supervisor} />
          <UU5.Forms.Text
            borderRadius="8px"
            label={<UU5.Bricks.Lsi lsi={{ en: "Teachers", cs: "Učitelé" }} />}
            name="teachers"
            value="25-1622-1,24-9525-1"
          />
        </UU5.Bricks.Container>
      </UU5.Forms.ContextForm>
    );
    //@@viewOff:render
  },
});

export default Form;