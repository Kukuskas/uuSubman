//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject, useDataList } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
//@@viewOff:impor<<<<

const SubjectDetailProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectDetailProvider",
  //@@viewOff:statics

  render({ children, subjectId }) {
    let objectDataValues = useDataObject({
      initialDtoIn: {id: subjectId},
      handlerMap: {
        load: Calls.getSubject,
        updateSubject: Calls.updateSubject,
        deleteSubject: Calls.deleteSubject,
        updateTopicSubject: Calls.updateTopicSubject,
        deleteTopicSubject: Calls.deleteTopicSubject,
        addTopicSubject: Calls.addTopicSubject,
        getSubject: Calls.getSubject,
        deleteStudyMaterialSubject: Calls.deleteStudyMaterialSubject,
        addStudyMaterialSubject: Calls.addStudyMaterialSubject,
      },
    });

    let { state, data, pendingData, errorData, handlerMap } = objectDataValues;
    // let listDataValues = useDataList({
    //   pageInfo: 200,
    //   handlerMap2: {
    //     deleteSubject: Calls.deleteSubject,
    //   },
    // });

    // let handlerMap2 = listDataValues;
    //@@viewOff:hooks
    //@@viewOff:private

    //@@viewOn:render
    return children({
      state,
      data,
      pendingData,
      errorData,
      handlerMap,
      // handlerMap2,
    });
    //@@viewOff:render
  },
});

export default SubjectDetailProvider;
