//@@viewOn:imports
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const Subjects = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Subjects",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return ( 
    <h1>Subjects</h1>
    );
    //@@viewOff:render
  }
});

export default Subjects;