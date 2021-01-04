//@@viewOn:imports
import Plus4U5 from "uu_plus4u5g01";
import { createVisualComponent, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import SubmanMainContext from "../bricks/subman-main-context";
//@@viewOff:imports

const Top = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Top",
  //@@viewOff:statics

  render() {
    //@@viewOn:hooks
    const { data: SubmanMain } = useContext(SubmanMainContext);
    //@@viewOff:hooks

    //@@viewOn:render
    const title = `${SubmanMain.name} [${SubmanMain.state}]`;

    return <Plus4U5.App.TopBt>{title}</Plus4U5.App.TopBt>;
    //@@viewOff:render
  }
});

export default Top;