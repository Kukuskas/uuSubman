//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState } from "uu5g04-hooks";
import Config from "./config/config";
import SubjectCreateForm from "./subject-create-form";
//@@viewOff:imports

const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",
};

const SubjectCreate = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectCreate",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onCreate: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onCreate: () => {},
  },
  //@@viewOff:defaultProps

  render({ onCreate }) {
    //@viewOn:hooks
    const [mode, setMode] = useState(Mode.BUTTON);
    //@viewOff:hooks

    //@@viewOn:private
    function handleAddClick() {
      setMode(Mode.FORM);
    }
    function handleSave(opt) {
      let it = opt.values;
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
        languageOfStudy: it.languageOfStudy,
        teachers: it.teachers.split(","),
        visibility: false,
      };
      if (/^[0-9]{1,4}-[0-9]{1,4}(-[0-9]{1,4}(-[0-9]{1,4})?)?$/g.test(it.supervisor)) {
        
      onCreate(input);
      setMode(Mode.BUTTON);
      }else{return alert("fill in supervisor correctly")}
    }

    function handleCancel(subject) {
      setMode(Mode.BUTTON);
    }

    //@@viewOff:private

    //@@viewOn:render
    // function renderButton() {
    //   return (
    //     <UU5.Bricks.Button
    //       onClick={handleAddClick}
    //       colorSchema="primary"
    //       content={<UU5.Bricks.Lsi lsi={{ en: "Add subject", cs: "Přidat předmět" }} />}
    //     />
    //   );
    // }

    function renderForm() {
      return <SubjectCreateForm onSave={handleSave} onCancel={handleCancel} />;
    }

    switch (mode) {
      case Mode.BUTTON:
        // return renderButton();
      default:
        return renderForm();
    }
    //@@viewOff:render
  },
});

export default SubjectCreate;
