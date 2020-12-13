//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const Subject = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Subject",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subject: UU5.PropTypes.shape({
      name: UU5.PropTypes.shape.isRequired,
      desc: UU5.PropTypes.shape.isRequired,
    }),
    colorSchema: UU5.PropTypes.string,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: null,
    colorSchema: "blue",
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {}
  },
  //@@viewOff:defaultProps

  render({ subject, colorSchema, onDelete, onDetail }) {
    //@@viewOn:private
    function handleDelete() {
      onDelete(subject);
    }
    function handleDetail(){
        onDetail(subject);
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

    if (!subject) {
      return null;
    }
// onClick in div could be subject detail
    return (
      <div onClick={handleDetail}> 
          <UU5.Bricks.Card colorSchema={colorSchema}>
              <UU5.Bricks.Strong>{renderHeader()}</UU5.Bricks.Strong>
         <UU5.Bricks.Text content= {<UU5.Bricks.Lsi lsi={subject.desc}/>}/>
    <UU5.Bricks.Text>{subject.credits}</UU5.Bricks.Text>
         <UU5.Bricks.Text colorSchema="red">CLICK TO console.log something</UU5.Bricks.Text> 
      </UU5.Bricks.Card>
      </div>
    );
    //@@viewOff:render
  }
});

export default Subject;