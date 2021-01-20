//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const Test = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Test",
  //@@viewOff:statics


  //@@viewOff:defaultProps

  render({  }) {


    //@@viewOn:render
    return "Hey you";
    //@@viewOff:render
  }
});

export default Test;