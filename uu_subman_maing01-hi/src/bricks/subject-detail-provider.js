//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
//@@viewOff:impor<<<<

const SubjectDetailProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectProvider",
  //@@viewOff:statics

  render({ children, id }) {

    let dataValues = useDataObject({
      pageSize: 200,
      handlerMap: {
        load: Calls.getSubject,
        updateSubject: Calls.updateSubject,
        deleteSubject: Calls.deleteSubject,
      },
    });

    let { state, data, pendingData, errorData, handlerMap } = dataValues;
    //@@viewOff:hooks

    //@@viewOff:private

    //@@viewOn:render
    return children({
      state,
      data,
      pendingData,
      errorData,
      handlerMap,
    });
    //@@viewOff:render
  },
});

export default SubjectDetailProvider;
