//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState } from "uu5g04-hooks";
import Config from "./config/config";
import SubjectUpdateForm from "./subject-update-form";
import Css from "../routes/detail.css";
//@@viewOff:imports

const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",
};

const SubjectUpdate = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectUpdate",
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
      let it = opt.values;
      let lang = {}
      if (it.language=="cs") {
        lang = {cs: ""}
      }else if (it.language=="en") {
        lang = {en: ""}
      }else{
        return alert("Opravte informaci")
      }
      const input = {
        name: { 
          cs: it.nameCs, 
          en: it.nameEn 
        },
        credits: parseInt(it.credits),
        supervisor: it.supervisor,
        degree: it.degree,
        desc: {
          cs: it.descCs,
          en: it.descEn,
        },
        language: lang,

        teachers: it.teachers.split(","),
        visibility: false,
      };
      if (/^[0-9]{1,4}-[0-9]{1,4}(-[0-9]{1,4}(-[0-9]{1,4})?)?$/g.test(it.supervisor)) {
        
      onUpdate(input);
      setMode(Mode.BUTTON);
      }else{return alert("fill in supervisor correctly")}
    }

    function handleCancel() {
      setMode(Mode.BUTTON);
    }

    //@@viewOff:private

    //@@viewOn:render
    function renderButton() {
      return (
        <UU5.Bricks.Button
         onClick={handleUpdate} 
          bgStyle="transparent" 
         className={Css.update()} size="l"
         content = {<UU5.Bricks.Icon icon="glyphicon-edit"/>}
        />
      );
    }

    function renderForm() {
      return <SubjectUpdateForm onSave={handleSave} onCancel={handleCancel} onDelete={handleDelete} subject={subject}  />;
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

export default SubjectUpdate;
