//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./config/lsi";
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
      id: UU5.PropTypes.isRequired,
    }),
    colorSchema: UU5.PropTypes.string,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: null,
    colorSchema: "blue",
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render({ name, subject, colorSchema, onDelete, onUpdate }) {
    //@@viewOn:private
    function handleDelete() {
      onDelete(subject);
    }
    function handleUpdate() {
      onUpdate(subject);
    }
    function handleGet() {
      onGet(subject);
    }
    //@@viewOff:private

    //@@viewOn:render
    function renderHeader() {
      return (
        <>
          {<UU5.Bricks.Lsi lsi={subject.name} />}
          <UU5.Bricks.Button onClick={handleDelete} colorSchema="grey">
            <UU5.Bricks.Icon icon="mdi-delete" />
          </UU5.Bricks.Button>
        </>
      );
    }

    // onClick in div could be subject detail
    console.log(subject.credits);
    return (
      <UU5.Bricks.Section>
        <UU5.Bricks.Box colorSchema={colorSchema}>
          <UU5.Bricks.Strong content={<UU5.Bricks.Lsi lsi={subject.name} />} />
          <UU5.Bricks.Text content={<UU5.Bricks.Lsi lsi={Lsi.subjectCredits} />} />
          <UU5.Bricks.Text content={subject.credits} />

          <UU5.Bricks.Text content={<UU5.Bricks.Lsi lsi={Lsi.subjectLanguage} />} />
          <UU5.Bricks.Text content={subject.language} />
          <UU5.Bricks.Text content={<UU5.Bricks.Lsi lsi={Lsi.subjectSupervisor} />} />
          <UU5.Bricks.Text content= {subject.supervisor}/>
          <UU5.Bricks.Text content={<UU5.Bricks.Lsi lsi={Lsi.subjectDegree} />} />
          <UU5.Bricks.Text content= {subject.degree}/>
          <UU5.Bricks.Button content={<UU5.Bricks.Lsi lsi={Lsi.subjectChangeForm} />} />
          <UU5.Bricks.Text content={<UU5.Bricks.Lsi lsi={subject.desc} />} />
        </UU5.Bricks.Box>
      </UU5.Bricks.Section>
    );
  },
  //@@viewOff:render
});

export default SubjectDetail;
