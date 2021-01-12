//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, getState } from "uu5g04-hooks";
import Config from "./config/config";
import "uu5g04-forms";
import "uu5g04-bricks";

//@@viewOff:imports

const FormUpdate = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "FormStudents",
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
 
    function handleChange(event) {
      setUuIdentity(event.target.value);
    
    }

    function handleChanges(event) {
     
      setFormOfStudy(event.target.value);
    }
     
    function handleAdd() {
        const newStudentList = studentList.concat({ uuIdentity, formOfStudy });
 
        setStudentList (newStudentList);
      
    }

    function handleRemove(uuIdentity) {
        const newStudentList = studentList.filter((item)=> item.uuIdentity !== uuIdentity);
 
        setStudentList (newStudentList)
    }

 
    const students = [
      {
        // id: "a",
        uuIdentity: "",
        formOfStudy: ""
      }
    ];


    const [studentList, setStudentList] = useState(students);
    const [uuIdentity, setUuIdentity] = useState('');
    const [formOfStudy, setFormOfStudy] = useState('');
      console.log("********************");
console.log(studentList);

    return (
    <div>
      <div>
      <input type="text" name= "students" value={uuIdentity} onChange={handleChange} />
      <input type="radio" id="fulltime"
     name="student" value="fulltime"   />
    <label for="fulltime">Full-time</label>
    <input type="radio" id="parttime"
     name="student" value="fulltime"  />
    <label for="fulltime">Full-time</label>
  
 
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
            {studentList.map((student) => (
        <div key={student.uuIdentity}>
           <input  name="student" value={ student.uuIdentity}/>
             <input name ="student" value={formOfStudy}/>
            <button type="button" onClick={() => handleRemove(student)}>Remove</button></div>

        ))}
    </div>
    );
    //@@viewOff:render
  },
});

export default FormUpdate;
