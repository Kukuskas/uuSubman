//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";

import Config from "./config/config.js";
import Lsi from "../config/lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:static
  displayName: Config.TAG + "Left",
  //@@viewOff:static
};

export const Left = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Plus4U5.App.Left
        {...props}
        logoProps={{
          backgroundColor: UU5.Environment.colors.red.c100,
          backgroundColorTo: UU5.Environment.colors.red.c500,
          title: "uuSubman",
          companyLogo: `https://www.svgimages.com/svg-image/s3/student-256x256.png`,
          generation: "1",
        }}
        aboutItems={[{ content: <UU5.Bricks.Lsi lsi={Lsi.left.about} />, href: "about" }]}
        helpHref={null}
      >
        <Plus4U5.App.MenuTree

          // NOTE Item "id" equals to useCase so that item gets automatically selected when route changes (see spa-autheticated.js).
          items={[
            { id: "home", href: "home", content: <UU5.Bricks.Lsi lsi={Lsi.left.home} /> },
            { id: "subjects", href: "subjects", content: <UU5.Bricks.Lsi lsi={Lsi.left.subjects} /> },
          ]}
        />
      </Plus4U5.App.Left>
    );
    //@@viewOff:render
  },
});

export default Left;
