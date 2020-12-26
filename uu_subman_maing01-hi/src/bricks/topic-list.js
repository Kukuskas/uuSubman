//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Topic from "./topic";
import Uu5Tiles from "uu5tilesg02";
//@@viewOff:imports

const TopicList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "TopicList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    topics: UU5.PropTypes.array.isRequired,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    topics: [],
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {}
  },
  //@@viewOff:defaultProps

  render({ topics, onDetail, onUpdate, onDelete }) {
    //@@viewOn:render
    
    function renderItem(item) {
        return (
            <Topic topic={item.data.data} colorSchema="green" onDetail={onDetail} onUpdate={onUpdate} onDelete={onDelete} />
        );
      }
      
      
    
    if (topics.length === 0) {
      return <UU5.Common.Error content="WTF No topics!" />;
    }

    return (
        <><Uu5Tiles.Grid
      data={topics}
      tileHeight="auto"
      tileMinWidth={200}
      tileMaxWidth={300}
      tileSpacing={8}
      rowSpacing={8}
    >
        {renderItem}
    </Uu5Tiles.Grid>
    
</>
      );
    //@@viewOff:render
  }
});

export default TopicList;
