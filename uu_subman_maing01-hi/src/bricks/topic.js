//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import topicRoute from "../routes/topicRoute";
//@@viewOff:imports

const topic = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "topic",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    topic: UU5.PropTypes.shape({
      name: UU5.PropTypes.shape.isRequired,
      desc: UU5.PropTypes.shape.isRequired,
    }),
    colorSchema: UU5.PropTypes.string,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    topic: null,
    colorSchema: "blue",
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render({ topic, colorSchema, onDelete, onDetail }) {
    //@@viewOn:private

    function handleDelete() {
      onDelete(topic);
    }

    function handleDetail() {
      return UU5.Environment.getRouter().setRoute({
        component: <topicRoute topic={topic} />,
      });
    }
    //@@viewOff:private

    //@@viewOn:render
    function renderHeader() {
      return (
        <>
          {<UU5.Bricks.Lsi lsi={topic.name} />}
        </>
      );
    }

    if (!topic) {
      return null;
    }
    // onClick in div could be topic detail

    return (
     <> <div onClick={handleDetail}>
        <UU5.Bricks.Card colorSchema={colorSchema}>
          <UU5.Bricks.Strong>{renderHeader()}</UU5.Bricks.Strong>
          <UU5.Bricks.Section content={<UU5.Bricks.Lsi lsi={topic.desc} />} />
          <UU5.Bricks.Text content={topic.credits}/>
          <UU5.Bricks.Text colorSchema="red">click to see detail</UU5.Bricks.Text>
        </UU5.Bricks.Card>
      </div>
                <UU5.Bricks.Button size="s" onClick={handleDelete} bgStyle="transparent" >
            <UU5.Bricks.Icon icon="glyphicon-trash" />
            </UU5.Bricks.Button>{/* <UU5.Bricks.Button onClick={handleDelete} colorSchema="grey"><UU5.Bricks.Icon icon="mdi-delete" /></UU5.Bricks.Button> */}
      </>
    );
    //@@viewOff:render
  },
});

export default topic;
