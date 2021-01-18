//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "./config/config";
import Uu5Tiles from "uu5tilesg02";
import Css from "../routes/subject.css";
import Test from "./test";
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
    onDetail: () => { },
    onUpdate: () => { },
    onDelete: () => { }
  },
  //@@viewOff:defaultProps

  render({ topic, onDetail, onUpdate, onDelete }) { //EDIT
    //@@viewOn:render
    const [studyMaterials, setStudyMaterials] = useState(true);
    function handleClick() {
      studyMaterials == true ? setStudyMaterials(false) : setStudyMaterials(true)
    }
    return (
      <>

        <div onClick={handleClick}  >
          <UU5.Bricks.Box colorSchema="green" borderRadius="8px">
            <UU5.Bricks.Section content={topic.name} margin="5px" className={Css.topic()} icon="uu5-arrow-down" />
            <UU5.Bricks.Section content={topic.desc} margin="5px" />
          </UU5.Bricks.Box>
        </div>
        <UU5.Bricks.Section
          hidden={studyMaterials}
          content={<Test />}
        >
        </UU5.Bricks.Section>
      </>

    );
    //@@viewOff:render
  }
});

export default Topic;
