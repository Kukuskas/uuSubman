//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
//@@viewOff:impor<<<<

const StudyMaterialProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "StudyMaterialProvider",
  //@@viewOff:statics

  render({ children }) {
    let listDataValues = useDataList({
      pageSize: 200,
      handlerMap: {
        load: Calls.listStudyMaterials,
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

export default StudyMaterialProvider;
