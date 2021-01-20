//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import SubmanMainContext from "./subman-main-context";
//@@viewOff:imports

const SubmanMainProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubmanMainProvider",
  //@@viewOff:statics

  render({ children }) {
    //@@viewOn:hooks
    const state = useDataObject({
      handlerMap: {
        load: Calls.loadSubmanMain
      }
    });
    //@@viewOff:hooks

    //@@viewOn:render
    return <SubmanMainContext.Provider value={state}>{children}</SubmanMainContext.Provider>;
    //@@viewOff:render
  }
});

export default SubmanMainProvider;