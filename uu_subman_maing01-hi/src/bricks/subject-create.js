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
      let lang = {}
      if (it.language="cs") {
        lang = {cs: ""}
      }else if (it.language="en") {
        lang = {en: ""}
      }

      const input = {
        name: { cs: it.nameCs, en: it.nameEn },
        credits: it.credits,
        supervisor: it.supervisor,
        degree: it.degree,
        desc: {
          cs: it.descCs,
          en: it.descEn,
        },
        language: lang,

        teachers: [it.teachers],
        visibility: false,
      };
      console.log(input);

      // onCreate(opt.values);
      setMode(Mode.BUTTON);
    }

    function handleCancel(subject) {
      setMode(Mode.BUTTON);
    }
    function handleAddSubject(opt) {
      return {
        name: {
          cs: opt.values.nameCs,
          en: "string(50)",
        },
        credits: "integer(10).isRequired()",
        supervisor: "string(/([0-9]{3})[-]([0-9]{2})[-]([0-9]{3})/).isRequired()",
        degree: "oneOf([Bachalor, Magister]).isRequired()",
        desc: {
          cs: "string(500).isRequired()",
          en: "string(500).isRequired()",
        },
        language: "string(30).isRequired()",

        teachers: "string(/([0-9]{3})[-]([0-9]{2})[-]([0-9]{3})/)",
        visibility: "boolean()",
      };
    }
    //@@viewOff:private

    //@@viewOn:render
    function renderButton() {
      return (
        <UU5.Bricks.Button
          onClick={handleAddClick}
          colorSchema="primary"
          content={<UU5.Bricks.Lsi lsi={{ en: "Add subject", cs: "Přidat předmět" }} />}
        />
      );
    }

    function renderForm() {
      return <SubjectCreateForm onSave={handleSave} onCancel={handleCancel} />;
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

export default SubjectCreate;
