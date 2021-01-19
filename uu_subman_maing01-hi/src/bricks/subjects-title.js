//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useEffect } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const SubjectsTitle = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectsTitle",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subjects: UU5.PropTypes.array.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subjects: [],
  },
  //@@viewOff:defaultProps

  render({ subjects }) {
    //@@viewOn:hooks

    /* Title */
    useEffect(() => {
      const originalTitle = document.title;
      document.title = `${originalTitle} - ${subjects.length} subjects`;

      return () => (document.title = originalTitle);
    }, [subjects.length]);
    //@@viewOff:hooks

    //@@viewOn:render
    return null;
    //@@viewOff:render
  },
});

export default SubjectsTitle;
