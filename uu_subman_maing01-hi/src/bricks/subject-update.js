//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState, useContext, useSession } from "uu5g04-hooks";
import Config from "./config/config";
import SubjectUpdateForm from "./subject-update-form";
import Css from "../routes/detail.css";
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
    const { identity } = useSession();
    const contextData = useContext(SubmanMainContext);
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
        if (subject.language.cs) {
          lang = {cs:subject.language.cs}
        }
        lang = {en: subject.language.en,
        cs: {}
      }
      }else if (it.language=="en" ) {
        if (subject.language.en) {
          lang = {en:subject.language.en}
        }
        lang = {cs: subject.language.cs,
                en: {}
        }
      }else{
        return alert("Opravte informaci")
      }
      const input = {
        id: subject.id,
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
        students: [		{
          uuIdentity: "1-25-256",
          formOfStudy: "fulltime"
          },]
      };
      console.log("++++++++++++++++");
      console.log(input);
      if (/^[0-9]{1,4}-[0-9]{1,4}(-[0-9]{1,4}(-[0-9]{1,4})?)?$/g.test(it.supervisor)) {
        
      onUpdate(input);
      setMode(Mode.BUTTON);
      }else{return alert("fill in supervisor correctly")}
    }

    function handleCancel() {
      setMode(Mode.BUTTON);
    }

    //@@viewOff:private
    function canManage() {
      const isTeacher = subject.teachers.some(teacher => teacher === identity.uuIdentity );
      const isGarant = subject.supervisor === identity.uuIdentity;
      const isAuthority = contextData?.data?.authorizedProfileList?.some(profile => profile === Config.Profiles.AUTHORITIES);
      return isAuthority && (isTeacher ||isGarant);
    }

 
    //@@viewOn:render
    function renderButton() {
      return (
        <>
        {canManage() && ( 
        <UU5.Bricks.Button
         onClick={handleUpdate} 
          bgStyle="transparent" 
         className={Css.update()} size="l"
         content = {<UU5.Bricks.Icon icon="glyphicon-edit"/>}
        />)}
        </>
      );
    }

    function renderForm() {
      return <SubjectUpdateForm 
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

export default SubjectUpdate;
