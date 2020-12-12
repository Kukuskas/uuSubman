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
      name: UU5.PropTypes.string.isRequired,
      text: UU5.PropTypes.string.isRequired,
      averageRating: UU5.PropTypes.number.isRequired
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

  render({ subject, colorSchema, onDelete }) {
    //@@viewOn:private
    function handleDelete() {
      onDelete(subject);
    }
    //@@viewOff:private

    //@@viewOn:render
    function renderHeader() {
      return (
        <>
          {subject.name}
          <UU5.Bricks.Button onClick={handleDelete} colorSchema="red">
            <UU5.Bricks.Icon icon="mdi-delete" />
          </UU5.Bricks.Button>
        </>
      );
    }

    if (!subject) {
      return null;
    }

    return (
      <UU5.Bricks.Card header={renderHeader()} colorSchema={colorSchema}>
        <div>{subject.text}</div>
        <UU5.Bricks.Rating value={subject.averageRating} />
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  }
});

export default Subject;