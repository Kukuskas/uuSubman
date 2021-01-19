//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi } from "uu5g04-hooks";
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
    const fullTime =  useLsi({ cs:subject.language.cs.formOfStudy.fulltime.topics, en:subject.language.en.formOfStudy.fulltime.topics })
    const partTime = useLsi({ cs:subject.language.cs.formOfStudy.parttime.topics, en:subject.language.en.formOfStudy.parttime.topics })
    function renderItem(item) {
          if (item.length === 0) {
      return <UU5.Common.Error content="WTF No topics!" />;
    }else {
      console.log(item.data);
      return <Topic topic={item.data} colorSchema="green" onUpdate={onUpdate} onDelete={onDelete} teachers={subject.teachers} supervisor={subject.supervisor} />
      }}
    


    return (
    <>
     
      <Uu5Tiles.Grid
      data={studyForm=="Full-time"?fullTime:partTime}
      tileHeight="auto"
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
