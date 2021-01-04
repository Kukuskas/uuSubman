//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";

import Config from "./config/config.js";
import SubmanMainProvider from "../bricks/subman-main-provider";
import SubmanMainContext from "../bricks/subman-main-context";
import SpaReady from "./spa-ready";
//@@viewOff:imports

const SpaAuthenticated = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SpaAuthenticated",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <SubmanMainProvider>
        <SubmanMainContext.Consumer>
          {({ state, errorData }) => {
            switch (state) {
              case "pending":
              case "pendingNoData":
                return <UU5.Bricks.Loading />;
              case "error":
              case "errorNoData":
                return <UU5.Bricks.Error error={errorData.error} />;
              case "ready":
              case "readyNoData":
              default:
                return <SpaReady />;
            }
          }}
        </SubmanMainContext.Consumer>
      </SubmanMainProvider>
    );
    //@@viewOff:render
  }
});

export default SpaAuthenticated;