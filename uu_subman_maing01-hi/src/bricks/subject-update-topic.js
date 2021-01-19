//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState, useContext, useSession } from "uu5g04-hooks";
import Config from "./config/config";
import SubjectUpdateFormTopic from "./subject-update-form-topic";
import Css from "../routes/subject.css";

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
    subject: UU5.PropTypes.shape({
        name: UU5.PropTypes.shape.isRequired,
        desc: UU5.PropTypes.shape.isRequired,
        id: UU5.PropTypes.isRequired,
      }),
    onUpdate: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
      subject: null,
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps
  
  render({ onUpdate, onDelete, subject }) {
    //@viewOn:hooks
    const [mode, setMode] = useState(Mode.BUTTON);
    //@viewOff:hooks

    //@@viewOn:private
    function handleUpdate() {
      setMode(Mode.FORM);
    }
    function handleDelete(subject) {
        onDelete(subject); ;
      }

    function handleSave(opt) {
    //   let it = opt.values;
    //   it.test==""?it.test=[{uuIdentity:"", formOfStudy: "fulltime"}]: it.test= JSON.parse(it.test)
      
    //   const input = {
    //     id: subject.id,
    //     name: { 
    //       cs: it.nameCs, 
    //       en: it.nameEn 
    //     },
    //     credits: parseInt(it.credits),
    //     supervisor: it.supervisor,
    //     degree: it.degree,
    //     desc: {
    //       cs: it.descCs,
    //       en: it.descEn,
    //     },
    //     //languageOfStudy: it.languageOfStudy,
    //    // language: subject.language,
    //   // teachers: it.teachers.split(","),
    //     // visibility: false,
    //     // students: it.test
    //   };
    //   // if (it.students==null|| it.students==undefined) {
    //   //   input.students=[]      
    //   //   }
        
    //   if (/^[0-9]{1,4}-[0-9]{1,4}(-[0-9]{1,4}(-[0-9]{1,4})?)?$/g.test(it.supervisor)) {
    //     console.log("hahahahahahahahahahaha");
    //   onUpdate(input);
    //   setMode(Mode.BUTTON);
    //   }else{return alert("fill in supervisor correctly")}
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
         onClick={handleUpdate} 
          bgStyle="transparent" 
          colorSchema="blue"
          className={Css.updateTopic()} size="m"
          content = {<UU5.Bricks.Icon icon="glyphicon-edit"/>}
        />
        </>
      );
    }

    function renderForm() {
      return <SubjectUpdateFormTopic 
      onSave={handleSave} 
      onCancel={handleCancel} 
      onDelete={handleDelete}
      subject={subject}  />;
    }

    switch (mode) {
      case Mode.BUTTON:
        return  renderButton();
      default:
        return renderForm();
    }
    //@@viewOff:render
  },
});

export default SubjectUpdateTopic;
