//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useEffect } from "uu5g04-hooks";
import Config from "./config/config";
import "uu5g04-forms";
import "uu5g04-bricks";

//@@viewOff:imports

const FormUpdate = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectCreateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    // subject: UU5.PropTypes.shape({
    //   name: UU5.PropTypes.shape({ cs: UU5.PropTypes.string, en: UU5.PropTypes.string, }).isRequired,
    //   desc: UU5.PropTypes.shape({ cs: UU5.PropTypes.string, en: UU5.PropTypes.string, }).isRequired,
    //   id: UU5.PropTypes.isRequired,
    // }),
    onSave: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: null,
    onSave: () => {},
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
      if (/^[0-9]{1,4}-[0-9]{1,4}(-[0-9]{1,4}(-[0-9]{1,4})?)?$/g.test(opt.value)) {
        setSupervisor(opt.value);
        opt.component.setValueDefault(opt.value);
      } else if (opt.value !== "") {
        alert("Please fill in Supervisor uuIdentity");
      }
    }

    function _handleSupervisorOnDelete() {
      setSupervisor("");
      setDis(false);
    }

    function handleUuIdentityChange(value, index) {
      studentsList[index].uuIdentity = value;
      setStudentsList(studentsList);
      setTestStudents(JSON.stringify(studentsList));
    }
    function handleFormOfStudyChange(value, index) {
      studentsList[index].formOfStudy = value;
      setStudentsList(studentsList);
      setTestStudents(JSON.stringify(studentsList));
    }

    function handleAdd() {
      const i = studentsList;
      if (i[i.length - 1].uuIdentity == "") {
      } else {
        const newStudentsList = studentsList.concat({ uuIdentity: "", formOfStudy: "fulltime" });
        setStudentsList(newStudentsList);
      }
    }

    function handleRemove(i) {
      if (studentsList.length > 1) {
        const newStudentsList = studentsList.filter((_, index) => index !== i);

        setStudentsList(newStudentsList);
        setTestStudents(JSON.stringify(studentsList));
      } else {
        setStudentsList([{ uuUdentity: "", formOfStudy: "" }]);
        setTestStudents("");
      }
    }

    const [testStudents, setTestStudents] = useState("");
    const [studentsList, setStudentsList] = useState(subject.students);

    const formOfStudyName = [
      { content: <UU5.Bricks.Lsi lsi={{ en: "Full-time", cs: "Prezenční" }} />, value: "fulltime" },
      { content: <UU5.Bricks.Lsi lsi={{ en: "Part-time", cs: "Dálkové" }} />, value: "parttime" },
    ];

    const [dis, setDis] = useState(false);
    const [supervisor, setSupervisor] = useState(subject.supervisor);
    function SuperviseronLoad() {
      // Pass useEffect a function
      useEffect(() => {
        return () => console.log("lala");
      });

      return (
        supervisor && (
          <UU5.Bricks.Column colWidth="s-6" style={{ alignSelf: "flex-end" }}>
            <Plus4U5.Bricks.BusinessCard uuIdentity={supervisor} visual={"micro"} />
          </UU5.Bricks.Column>
        )
      );
    }

    return (
      <UU5.Forms.ContextForm onSave={onSave} onCancel={onCancel}>
        <UU5.Bricks.Container>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.Forms.Text
                borderRadius="8px"
                label={<UU5.Bricks.Lsi lsi={{ en: "Czech Name", cs: "Český Název" }} />}
                name="nameCs"
                value={subject.name.cs}
                required
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.Forms.Text
                borderRadius="8px"
                label={<UU5.Bricks.Lsi lsi={{ en: "English Name", cs: "Anglický Název" }} />}
                name="nameEn"
                value={subject.name.en}
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
                value={subject.credits}
                required
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-5">
              <UU5.Forms.SwitchSelector
                borderRadius="8px"
                items={degreeName}
                label={<UU5.Bricks.Lsi lsi={{ en: "Type of study", cs: "Typ studia" }} />}
                name="degree"
                value={subject.degree}
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-5">
              <UU5.Forms.SwitchSelector
                borderRadius="8px"
                items={languageOfStudy}
                label={<UU5.Bricks.Lsi lsi={{ en: "Language", cs: "Jazyk" }} />}
                name="languageOfStudy"
                value={subject.languageOfStudy}
              />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.RichText.EditorInput
                radius="8px"
                label={<UU5.Bricks.Lsi lsi={{ en: "Czech description", cs: "Český popis" }} />}
                name="descCs"
                value={subject.desc.cs}
                required
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.RichText.EditorInput
                // maxHeight = "106px"
                label={<UU5.Bricks.Lsi lsi={{ en: "English description", cs: "Anglický popis" }} />}
                name="descEn"
                value={subject.desc.en}
                required
              />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <UU5.Bricks.Column>
            <UU5.Forms.Text
              borderRadius="8px"
              label={<UU5.Bricks.Lsi lsi={{ en: "Supervisor", cs: "Garant" }} />}
              name="supervisor"
              disabled={dis}
              value={subject.supervisor}
              onBlur={_handleSupervisorOnBlur}
              validate={/^[0-9]{1,4}-[0-9]{1,4}(-[0-9]{1,4}(-[0-9]{1,4})?)?$/}
              required
            />
          </UU5.Bricks.Column>
          <SuperviseronLoad />
          <UU5.Bricks.Column>
            <UU5.Forms.Text
              borderRadius="8px"
              label={<UU5.Bricks.Lsi lsi={{ en: "Teachers", cs: "Učitelé" }} />}
              name="teachers"
              value={subject.teachers.toString()}
            />
            <UU5.Forms.Checkbox name="visibility" value={subject.visibility} label="Visibility" size="m" />
          </UU5.Bricks.Column>

          {studentsList.map((student, index) => (
            <div key={index}>
              <UU5.Bricks.Row label="student">
                <UU5.Bricks.Column colWidth="s-4">
                  <UU5.Forms.Text
                    type="text"
                    name={"students" + index}
                    value={
                      student == null
                        ? ((student = { uuIdentity: "", formOfStudy: "fulltime" }), student.uuIdentity)
                        : student.uuIdentity
                    }
                    onBlur={(value) => handleUuIdentityChange(value.value, index)}
                  />
                </UU5.Bricks.Column>
                <UU5.Bricks.Column colWidth="s-4">
                  <UU5.Forms.SwitchSelector
                    borderRadius="8px"
                    items={formOfStudyName}
                    value={student == null ? "" : student.formOfStudy}
                    name={"formOfStudy" + index}
                    onChange={(value) => handleFormOfStudyChange(value.value, index)}
                  />
                </UU5.Bricks.Column>
                <UU5.Bricks.Column colWidth="s-4">
                  <UU5.Bricks.Button onClick={() => handleRemove(index)} content="Remove" />
                </UU5.Bricks.Column>
              </UU5.Bricks.Row>
            </div>
          ))}

          <UU5.Bricks.Row>
            <UU5.Bricks.Button onClick={() => handleAdd(studentsList)} content="Add" />
          </UU5.Bricks.Row>
          <UU5.Forms.Text name="test" value={testStudents} hidden={true} />
        </UU5.Bricks.Container>
      </UU5.Forms.ContextForm>
    );
    //@@viewOff:render
  },
});

export default FormUpdate;
