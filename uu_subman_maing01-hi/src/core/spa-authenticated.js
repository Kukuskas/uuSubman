//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, SessionProvider } from "uu5g04-hooks";

import Config from "./config/config.js";
import SubmanMainProvider from "../bricks/subman-main-provider";
import SubmanMainContext from "../bricks/subman-main-context";
import SpaReady from "./spa-ready";
//@@viewOff:imports

const STATICS = {
  displayName: Config.TAG + "SpaAuthenticated",
};

const SpaAuthenticated = createVisualComponent({
  ...STATICS,
  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    return (
      <SessionProvider session={UU5.Environment.getSession()}>
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
                  return <SpaReady {...props} />;
              }
            }}
          </SubmanMainContext.Consumer>
        </SubmanMainProvider>
      </SessionProvider>
    );
    //@@viewOff:render
  },
});

export default SpaAuthenticated;
