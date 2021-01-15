//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Uu5Tiles from "uu5tilesg02";
//@@viewOff:imports

const Topic = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "TopicList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    // topic: UU5.PropTypes.array.isRequired, //EDIT
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    topics: [],  //EDIT
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {}
  },
  //@@viewOff:defaultProps

  render({ topic, onDetail, onUpdate, onDelete }) { //EDIT
    //@@viewOn:render
    

    return (
       
        <>
   <UU5.Bricks.Section content={topic.name} margin="5px"/>
   <UU5.Bricks.Section content={topic.desc} margin="5px"/>
   </>
        
      );
    //@@viewOff:render
  }
});

export default Topic;
