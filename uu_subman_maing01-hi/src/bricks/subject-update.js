//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import FormUpdate from "./form-update";
import Css from "../routes/subject.css";
import SubmanMainContext from "../bricks/subman-main-context";
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
    const contextData = useContext(SubmanMainContext);
    const [mode, setMode] = useState(Mode.BUTTON);
    //@viewOff:hooks

    //@@viewOn:private
    function handleUpdate() {
      setMode(Mode.FORM);
    }
    function handleDelete() {
      onDelete(subject.id);
    }

    function handleSave(opt) {
      let it = opt.values;
      it.test == "" ? (it.test = [{ uuIdentity: "", formOfStudy: "fulltime" }]) : (it.test = JSON.parse(it.test));
      const input = {
        id: subject.id,
        name: {
          cs: it.nameCs,
          en: it.nameEn,
        },
        credits: parseInt(it.credits),
        supervisor: it.supervisor,
        degree: it.degree,
        desc: {
          cs: it.descCs,
          en: it.descEn,
        },
        languageOfStudy: it.languageOfStudy,
        language: subject.language,
        teachers: it.teachers.split(","),
        visibility: it.visibility,
        students: it.test,
      };

      if (/^[0-9]{1,4}-[0-9]{1,4}(-[0-9]{1,4}(-[0-9]{1,4})?)?$/g.test(it.supervisor)) {
        console.log("hahahahahahahahahahaha");
        onUpdate(input);
        setMode(Mode.BUTTON);
      } else {
        return alert("fill in supervisor correctly");
      }
    }

    function handleCancel() {
      setMode(Mode.BUTTON);
    }

    function renderButton() {
      return (
        <>
          {isAdministrator() && (
            <UU5.Bricks.Button
              onClick={handleUpdate}
              bgStyle="transparent"
              colorSchema="blue"
              className={Css.update()}
              size="l"
              content={<UU5.Bricks.Icon icon="glyphicon-edit" />}
            />
          )}
        </>
      );
    }

    function isAdministrator() {
      const isAdministration = contextData?.data?.authorizedProfileList?.some(
        (profile) => profile === Config.Profiles.ADMINISTRATIONS
      );
      const isAuthority = contextData?.data?.authorizedProfileList?.some(
        (profile) => profile === Config.Profiles.AUTHORITIES
      );
      return isAuthority || isAdministration;
    }

    function renderForm() {
      return (
        <UU5.Bricks.Container>
        <UU5.Forms.ContextModal size="l" shown={true}>
          <UU5.Forms.ContextHeader
            content={<UU5.Bricks.Lsi lsi={{ en: "Edit a new subject", cs: "Upravit nový předmět" }} />}
            info={<UU5.Bricks.Lsi lsi={{ cs: <UU5.Bricks.Paragraph style="margin: 0" />, en: "More info..." }} />}
          />
          <>
            {isAdministrator() && (
              <UU5.Bricks.Button size="s" onClick={handleDelete} bgStyle="transparent">
                <UU5.Bricks.Icon icon="glyphicon-trash" />
              </UU5.Bricks.Button>
            )}
          </>

          <FormUpdate onSave={handleSave} onCancel={handleCancel} subject={subject} />

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

export default SubjectUpdate;
