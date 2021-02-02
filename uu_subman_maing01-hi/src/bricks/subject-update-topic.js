//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import Css from "../routes/subject.css";
import SubmanMainContext from "../bricks/subman-main-context";

//@@viewOff:imports

const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",
};

const SubjectUpdateTopic = createVisualComponent({
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
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    topic: {},
    onUpdateTopic: () => { },
  },
  //@@viewOff:defaultProps

  render({ onUpdateTopic, id, topic, language, formOfStudy }) {
    //@viewOn:hooks
    
    const contextData = useContext(SubmanMainContext);
     const [testStudyMaterialList, setTestStudyMaterialList] = useState("");
    const [studyMaterialList, setStudyMaterialList] = useState(topic.studyMaterialList);
    const [mode, setMode] = useState(Mode.BUTTON);
    //@viewOff:hooks

    //@@viewOn:private
    function handleUpdateTopic() {
      setMode(Mode.FORM);
    }

    function handleBaseUriChange(value, index) {
      studyMaterialList[index].url = value;
      setStudyMaterialList(studyMaterialList);
      setTestStudyMaterialList(JSON.stringify(studyMaterialList));
    }

    function handleNameChange(value, index) {
      studyMaterialList[index].name = value;
      setStudyMaterialList(studyMaterialList);
      setTestStudyMaterialList(JSON.stringify(studyMaterialList));
    }

    function handleTypeChange(value, index) {
      studyMaterialList[index].type = value;
      setStudyMaterialList(studyMaterialList);
      setTestStudyMaterialList(JSON.stringify(studyMaterialList));
    }

    function handleAdd() {
      const i = studyMaterialList;
      if (i[i.length - 1].Url == "") {
      } else {
        const newStudyMaterialList = studyMaterialList.concat({ url: "", name: "", type: "books" });
        setStudyMaterialList(newStudyMaterialList);
      }
    }

    function handleRemove(i) {
      if (studyMaterialList.length > 1) {
        const newStudentsList = studyMaterialList.filter((_, index) => index !== i);
        setStudyMaterialList(newStudentsList);
        setTestStudyMaterialList(JSON.stringify(studyMaterialList));
      } else {
        setStudyMaterialList([{ url: "", name: "", type: "books" }]);
        setTestStudyMaterialList("");
      }
    }
    


    function handleSave(opt) {
      let it = opt.values;
      it.test == "" ?
       (it.test = [{ url: "", name: "", type: "books" }]) 
       : (it.test = JSON.parse(it.test));
      const input = {
        id: id,
        data: {
          name: it.name,
          desc: it.desc,
          id: topic.id,
          studyMaterialList: it.test 
          // {
          //   url: "http://...,
          //   name: "blah blah - kesha",
          //   type: "books"
          // }
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



    //@@viewOff:private

    //@@viewOn:render
    function renderButton() {
      return (
        <>
          <UU5.Bricks.Button
            onClick={handleUpdateTopic}
            bgStyle="transparent"
            colorSchema="primary"
            className={Css.updateTopic()}
            size="s"
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
                      label={<UU5.Bricks.Lsi lsi={{ en: "Edit Name", cs: "Upravit Téma" }} />}
                      name="name"
                      value={topic.name}
                    />
                  </UU5.Bricks.Column>
                  <UU5.Bricks.Column colWidth="s-6">
                    <UU5.Forms.Text
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
                          label="Url"
                          type="text"
                          name={"url" + index}
                          value={
                            studyMaterial == null
                              ? ((studyMaterial = { url: "", name: "", type: "books" }), studyMaterial.url)
                              : studyMaterial.url
                          }
                          onBlur={(value) => handleBaseUriChange(value.value, index)}
                          required
                        />
                      </UU5.Bricks.Column>
                      <UU5.Bricks.Column colWidth="s-4">
                        <UU5.Forms.Text
                          label="Name"
                          type="text"
                          name={"name" + index}
                          value={studyMaterial == null ? "" : studyMaterial.name}
                          onBlur={(value) => handleNameChange(value.value, index)}
                        />
                      </UU5.Bricks.Column>
                      <UU5.Bricks.Column colWidth="s-4">
                        <UU5.Forms.Select
                          colorSchema="orange"
                          label="Type"
                          size="m"
                          value={studyMaterial == null ? "" : studyMaterial.type}
                          name={"type" + index}
                          onChange={(value) => handleTypeChange(value.value, index)}
                          required
                        >
                          <UU5.Forms.Select.Option value="books" />
                          <UU5.Forms.Select.Option value="videos" />
                          <UU5.Forms.Select.Option value="courses" />
                          <UU5.Forms.Select.Option value="others" />

                        </UU5.Forms.Select>
                      </UU5.Bricks.Column>
                      <UU5.Bricks.Column colWidth="s-4">
                        <UU5.Bricks.Button size="s"
                          onClick={() => handleRemove(index)}
                          colorSchema="primary" bgStyle="filled">
                          <UU5.Bricks.Lsi lsi={{ en: "Remove", cs: "Odebrat" }} />
                          <UU5.Bricks.Icon icon="mdi-minus-circle" />
                        </UU5.Bricks.Button>
                      </UU5.Bricks.Column>
                    </UU5.Bricks.Row>
                  </div>
                ))}

                {/* <UU5.Bricks.Row> */}
                <UU5.Bricks.Button size="s"
                  className={Css.buttons()}
                  onClick={() => handleAdd(studyMaterialList)}
                  colorSchema="primary" bgStyle="filled">
                  <UU5.Bricks.Lsi lsi={{ en: "Add", cs: "Přidat" }} />
                  <UU5.Bricks.Icon icon="mdi-plus-circle" />
                </UU5.Bricks.Button>
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
