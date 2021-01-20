//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
//@@viewOff:impor<<<<

const SubjectProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectProvider",
  //@@viewOff:statics

  render({ children }) {
    let listDataValues = useDataList({
      pageSize: 200,
      handlerMap: {
        load: Calls.listSubjects,
        createSubject: Calls.createSubject,
        updateSubject: Calls.updateSubject,
        deleteSubject: Calls.deleteSubject,
        updateTopicSubject: Calls.updateTopicSubject,
      },
    });

    let { state, data, newData, pendingData, errorData, handlerMap } = listDataValues;
    //@@viewOff:hooks

    //@@viewOff:private

    //@@viewOn:render
    return children({
      state,
      data,
      newData,
      pendingData,
      errorData,
      handlerMap,
    });
    //@@viewOff:render
  },
});

export default SubjectProvider;
