//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Css from "../routes/detail.css";
import Uu5Tiles from "uu5tilesg02";
//@@viewOff:imports

const TeacherList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "TeacherList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    teachers: UU5.PropTypes.array.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    teachers: []
  },
  //@@viewOff:defaultProps

  render({ teachers}) {
    //@@viewOn:render
    



    function renderItem(item) {
        console.log("+++++++++++++++++++++++++++++++++");
        console.log(item);
       
        return (
            <Plus4U5.Bricks.BusinessCard uuIdentity={item.data} hidePhoto={true} visual="micro" />
        );
      }
    
    if (teachers.length === 0) {
      return <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={{ en: "No teachers", cs: "Žadní učitelé" }} />}/>
    }
    return (
<Uu5Tiles.Grid
      data={teachers}
      className={Css.detail()} 
      tileHeight="auto"
      tileMinWidth="auto"
      tileMaxWidth={150}
      tileSpacing={0}
      rowSpacing={0}
    >
        {renderItem}
    </Uu5Tiles.Grid>
      );
    //@@viewOff:render
  }
});

export default TeacherList;

