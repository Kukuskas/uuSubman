//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import Css from "../routes/subject.css";
import SubmanMainContext from "../bricks/subman-main-context";

//@@viewOff:imports

const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",
};

const SubjectUpdateTopic = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectUpdateTopic",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    topic: UU5.PropTypes.shape({
      name: UU5.PropTypes.string,
      desc: UU5.PropTypes.string.isRequired,
      studyMaterialList: UU5.PropTypes.array,
      id: UU5.PropTypes.isRequired,
    }),
    onUpdateTopic: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    topic: {},
    onUpdate: () => { },
    onDelete: () => { },
  },
  //@@viewOff:defaultProps

  render({ onUpdateTopic, id, topic, language, formOfStudy }) {
    //@viewOn:hooks
    console.log("this is topic");
    console.log(topic);
   const [testStudyMaterialList, setTestStudyMaterialList] = useState("");
    const [studyMaterialList, setStudyMaterialList] = useState(topic.studyMaterialList);
    const [mode, setMode] = useState(Mode.BUTTON);
    //@viewOff:hooks

    //@@viewOn:private
    function handleUpdateTopic() {
      setMode(Mode.FORM);
    }

    function handleAdd() {
      const i = studentsList;
      if (i[i.length - 1].uuIdentity == "") {
      } else {
        const newStudentsList = studentsList.concat({ uuIdentity: "", formOfStudy: "fulltime" });
        setStudentsList(newStudentsList);
      }
    }
   
    // function handleRemove(i) {
    //   if (studentsList.length > 1) {
    //     const newStudentsList = studentsList.filter((_, index) => index !== i);

    //     setStudentsList(newStudentsList);
    //     setTestStudents(JSON.stringify(studentsList));
    //   } else {
    //     setStudentsList([{ uuUdentity: "", formOfStudy: "" }]);
    //     setTestStudents("");
    //   }
    // }


    function handleSave(opt) {
      let it = opt.values;
      const input = {
        id: id,
        data: {
          name: it.name,
          desc: it.desc,
          id: topic.id,
          studyMaterialList: [],
        },
        language: language,
        formOfStudy: formOfStudy
      };

      onUpdateTopic(input);
      topic = input.data
      setMode(Mode.BUTTON);
    }

    function handleCancel() {
      setMode(Mode.BUTTON);
    }

    const contextData = useContext(SubmanMainContext);




    //@@viewOff:private

    //@@viewOn:render
    function renderButton() {
      return (
        <>
          <UU5.Bricks.Button
            onClick={handleUpdateTopic}
            bgStyle="transparent"
            colorSchema="blue"
            className={Css.updateTopic()}
            size="m"
            content={<UU5.Bricks.Icon icon="glyphicon-edit" />}
          />
        </>
      );
    }

    function renderForm() {
      return (

        <UU5.Bricks.Container>
        <UU5.Forms.ContextModal size="l" shown={true}>
          <UU5.Forms.ContextHeader
            content={<UU5.Bricks.Lsi lsi={{ en: "Edit topic", cs: "Upravit téma" }} />}
            info={<UU5.Bricks.Lsi lsi={{ cs: <UU5.Bricks.Paragraph style="margin: 0" />, en: "More info..." }} />}
          />


          <UU5.Forms.ContextForm onSave={handleSave} onCancel={handleCancel}>
        <UU5.Bricks.Container>
        <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="s-6">
          <UU5.Forms.Text
            borderRadius="8px"
            label={<UU5.Bricks.Lsi lsi={{ en: "Edit Name", cs: "Upravit Téma" }} />}
            name="name"
            value={topic.name}
          />
             </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-6">
          <UU5.Forms.Text
            borderRadius="8px"
            label={<UU5.Bricks.Lsi lsi={{ en: "Edit Description", cs: "Upravit Popis" }} />}
            name="desc"
            value={topic.desc}
            required
          />
           </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          {studyMaterialList.map((studyMaterial, index) => (
            <div key={index}>
              <UU5.Bricks.Row label="studyMaterial">
                <UU5.Bricks.Column colWidth="s-4">
                  <UU5.Forms.Text
                    type="text"
                    name={"baseUri" + index}
                    value={
                      studyMaterial == null
                        ? ((studyMaterial = { baseUri: "", name: "materials"/*, type:"books"*/ }), studyMaterial.baseUri)
                        : studyMaterial.baseUri
                    }
                   // onBlur={(value) => handleUuIdentityChange(value.value, index)}
                  />
                </UU5.Bricks.Column>
                <UU5.Bricks.Column colWidth="s-4">
                <UU5.Forms.Text
                    type="text"
                    name={"name" + index}
                    value={studyMaterial == null ? "" : studyMaterial.name}
                  //  onBlur={(value) => handleUuIdentityChange(value.value, index)}
                  />
                </UU5.Bricks.Column>
                {/* <UU5.Bricks.Column colWidth="s-4">
                  <UU5.Bricks.Button onClick={() => handleRemove(index)} content="Remove" />
                </UU5.Bricks.Column> */}
              </UU5.Bricks.Row>
            </div>
          ))}

          <UU5.Bricks.Row>
            <UU5.Bricks.Button onClick={() => handleAdd(studyMaterialList)} content="Add" />
          </UU5.Bricks.Row>
          <UU5.Bricks.Row>
            <UU5.Bricks.Button onClick={console.log("")} content="Test" />
          </UU5.Bricks.Row>
          <UU5.Forms.Text name="test" value={testStudyMaterialList} hidden={true} />

        </UU5.Bricks.Container>
      </UU5.Forms.ContextForm>

          <UU5.Forms.ContextControls
            buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={{ en: "Edit", cs: "Upravit" }} /> }}
            buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={{ en: "Cancel", cs: "Zrušit" }} /> }}
          />
        </UU5.Forms.ContextModal>
      </UU5.Bricks.Container>
      );
    }

    switch (mode) {
      case Mode.BUTTON:
        return renderButton();
      default:
        return renderForm();
    }
    //@@viewOff:render
  },
});

export default SubjectUpdateTopic;
