//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, getState } from "uu5g04-hooks";
import Config from "./config/config";
import "uu5g04-forms";
import "uu5g04-bricks";
import Uu5Tiles from "uu5tilesg02";

//@@viewOff:imports

const FormStudents = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "FormStudents",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    students: UU5.PropTypes.shape({
      uuIdentity: UU5.PropTypes.shape.isRequired,
      formOfStudy: UU5.PropTypes.shape.isRequired
    }),
    onSubmit: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    students: null,
    onSubmit: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps
  getInitialState() {
    return {
      size: "m",
    };
  },
  render({ onSave, onCancel, students }) {
    //@@viewOn:render

    function handleChange(event) {
      setUuIdentity(event.target.value);
    }

    function handleChanges(event) {
      // setFormOfStudy(event.target.value);
    }

    function handleAdd() {
      const newStudentsList = studentsList.concat({ uuIdentity, formOfStudy });

      setstudentsList(newStudentsList);
    }

    function handleRemove(uuIdentity) {
      const newStudentsList = studentsList.filter((item) => item.uuIdentity !== uuIdentity);

      setStudentsList(newStudentsList);
    }

    const [studentsList, setStudentsList] = useState(students);
    const [uuIdentity, setUuIdentity] = useState("");
    const [formOfStudy, setFormOfStudy] = useState("fulltime");
    console.log("********************");
    console.log(studentsList);
    const formOfStudyName = [
      { content: <UU5.Bricks.Lsi lsi={{ en: "Full-time", cs: "Prezenční" }} />, value: "fulltime" },
      { content: <UU5.Bricks.Lsi lsi={{ en: "Part-time", cs: "Dálkové" }} />, value: "parttime" }
    ];

    return (
      <>
                    {studentsList.map((student) => (
        <>
        
        {/* <div key={student.uuIdentity}>
           <input  name="student" value={ student.uuIdentity}/>
             <input name ="student" value={formOfStudy}/>
            <button type="button" onClick={() => handleRemove(student)}>Remove</button></div> */}
            
            <UU5.Bricks.Row label="student">
              <UU5.Bricks.Column colWidth="s-4">
                <UU5.Forms.Text type="text" name="students" value={student.uuIdentity} onChange={handleChange} />
              </UU5.Bricks.Column>
              <UU5.Bricks.Column colWidth="s-4">
              <UU5.Forms.SwitchSelector
                    borderRadius="8px"
                    items={formOfStudyName}
                    value={student.formOfStudy}
                    name="formOfStudy"
                  />           
                </UU5.Bricks.Column>
                <UU5.Bricks.Column colWidth="s-4">
                <UU5.Bricks.Button onClick={() => handleRemove(student)} content="Remove"/>
                </UU5.Bricks.Column>
            </UU5.Bricks.Row>
          </>

      ))}
        <UU5.Bricks.Row>
          <UU5.Bricks.Button onClick={handleAdd} content="Add"/>
        </UU5.Bricks.Row>
      </>


    );
    //@@viewOff:render
  },
});

export default FormStudents;
