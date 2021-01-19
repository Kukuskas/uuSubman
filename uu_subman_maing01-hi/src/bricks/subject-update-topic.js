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

  render({ onUpdate, onDelete, subject, topic }) {
    //@viewOn:hooks
    const [mode, setMode] = useState(Mode.BUTTON);
    //@viewOff:hooks

    //@@viewOn:private
    function handleUpdate() {
      setMode(Mode.FORM);
    }
    function handleDelete(topic) {
      onDelete(topic);
    }

    function handleSave(opt) {
      let it = opt.values;
      console.log("+++++++it+++++");
      console.log(it);
      const input = {
        id: subject.id,
        name: it.name,
        desc: it.desc,
        id: topic.id,
        studyMaterialList: [],
      };

      onUpdate(input);
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
            onClick={handleUpdate}
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
        <SubjectUpdateFormTopic onSave={handleSave} onCancel={handleCancel} onDelete={handleDelete} topic={topic} />
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
