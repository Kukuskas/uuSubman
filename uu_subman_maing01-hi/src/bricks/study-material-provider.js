//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
//@@viewOff:impor<<<<

const StudyMaterialProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "StudyMaterialProvider",
  //@@viewOff:statics

  render({ children, subjectId,  formOfStudy, language }) {
    let objectDataValues = useDataObject({
      initialDtoIn: {id: subjectId, language:language, formOfStudy:formOfStudy },
      handlerMap: {
        load: Calls.studyMaterialListSubject,
        deleteStudyMaterialSubject: Calls.deleteStudyMaterialSubject,
        addStudyMaterialSubject: Calls.addStudyMaterialSubject,
      },
    });

    let { state, data, pendingData, errorData, handlerMap } = objectDataValues;

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

export default StudyMaterialProvider;
