//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const SubjectDetail = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Subject",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subject: UU5.PropTypes.shape({
      name: UU5.PropTypes.shape.isRequired,
      desc: UU5.PropTypes.shape.isRequired,
      id: UU5.PropTypes.isRequired
    }),
    colorSchema: UU5.PropTypes.string,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: null ,
    colorSchema: "blue",
    onUpdate: () => {},
    onDelete: () => {}
    
  },
  //@@viewOff:defaultProps

  render({ id, subject, colorSchema, onDelete, onUpdate }) {
    //@@viewOn:private
    function handleDelete() {
      onDelete(subject);
    }
    function handleUpdate(){
        onUpdate(subject);
    }
    function handleGet(){
      onGet(subject);
  }
    //@@viewOff:private

    //@@viewOn:render
    function renderHeader() {
      return (
        <>
          {<UU5.Bricks.Lsi lsi={subject.name}/>}
          <UU5.Bricks.Button onClick={handleDelete} colorSchema="grey">
            <UU5.Bricks.Icon icon="mdi-delete" />
          </UU5.Bricks.Button>
        </>
      );
    }

    console.log(subject);
// onClick in div could be subject detail
    return (
<UU5.Bricks.Section>
  {id} is id in subject-detail
        {/* <UU5.Bricks.Header content= {<UU5.Bricks.Lsi lsi={subject.name.en}/>}/>
        <UU5.Bricks.Text content ={<UU5.Bricks.Lsi lsi={Lsi.subjectCredits}/> + ": " + subject.credits}/>
        <UU5.Bricks.Text content ={<UU5.Bricks.Lsi lsi={Lsi.subjectLanguage}/> + ": " + subject.language.cs + " " +  subject.language.en}/> 
        <UU5.Bricks.Text content ={<UU5.Bricks.Lsi lsi={Lsi.subjectSupervisor}/> + ": " + subject.supervisor}/>  
        <UU5.Bricks.Text content ={<UU5.Bricks.Lsi lsi={Lsi.subjectDegree}/> + ": " + subject.degree}/>
        <UU5.Bricks.Button content ={<UU5.Bricks.Lsi lsi={Lsi.subjectChangeForm}/>} /> */}
        </UU5.Bricks.Section>
    )}
    //@@viewOff:render
  }
);

export default SubjectDetail;