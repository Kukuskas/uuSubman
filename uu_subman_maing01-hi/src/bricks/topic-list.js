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
    subject: UU5.PropTypes.shape({
      name: UU5.PropTypes.shape.isRequired,
      desc: UU5.PropTypes.shape.isRequired,
      id: UU5.PropTypes.isRequired,
    }),
    studyForm: UU5.PropTypes.string,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: {},
    studyForm: "Full-time",
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {}
  },
  //@@viewOff:defaultProps

  render({ subject, studyForm, onUpdate, onDelete }) {
    //@@viewOn:render
    function renderItem(item) {
      console.log(item.data);
          if (item.length === 0) {
      return <UU5.Common.Error content="WTF No topics!" />;
    }  
    return (
          <Topic topic={item.data} colorSchema="green" onUpdate={onUpdate} onDelete={onDelete} />
        );
      }
      
      
    


    return (
        <><Uu5Tiles.Grid
      data={studyForm=="Full-time"?subject.language.cs.studyForms.fulltime.topics:subject.language.cs.studyForms.parttime.topics}
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
