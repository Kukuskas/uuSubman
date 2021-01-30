//@@viewOn:imports
import { createVisualComponent, useContext, useState, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import StudyMaterialList from "./study-material-list";
import StudyMaterialProvider from "./study-material-provider";
import Css from "../routes/subject.css";
import UU5 from "uu5g04";
import SubmanMainContext from "./subman-main-context";



//@@viewOff:imports

const StudyMaterials = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "StudyMaterials",
  //@@viewOff:statics

  //@@viewOn:render
  render({subject, language, formOfStudy}) {
    //@@viewOn:render
    const contextData = useContext(SubmanMainContext);

    //@viewOff:hooks

    //@@viewOn:private
    function showError(content) {
      UU5.Environment.getPage().getAlertBus().addAlert({
        content,
        colorSchema: "red",
      });
    }

    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }
    function renderReady(studyMaterials) {
 
      return (
<>
          <StudyMaterialList
            studyMaterials={studyMaterials}
            subject={subject.subject}
            formOfStudy={formOfStudy}
            language={language}
          />
        </>
        
      );
    }

    function renderError(errorData) {
      switch (errorData.operation) {
        case "load":
        case "loadNext":
        default:
          return <UU5.Bricks.Error content="Error happened!" error={errorData.error} errorData={errorData.data} />;
      }
    }

    return (
      <UU5.Bricks.Section className={Css.main()}>
        <StudyMaterialProvider>
          {({ state, data, errorData, pendingData, handlerMap }) => {
            // createSubjectRef.current = handlerMap.createSubject;
            // updateSubjectRef.current = handlerMap.updateSubject;
            // deleteSubjectRef.current = handlerMap.deleteSubject;

            switch (state) {
              case "pending":
              case "pendingNoData":
                return renderLoad();
              case "error":
              case "errorNoData":
                return renderError(errorData);
              case "itemPending":
              case "ready":
              case "readyNoData":
              default:
                return renderReady(data);
            }
          }}
        </StudyMaterialProvider>
      </UU5.Bricks.Section>
    );
    //@@viewOff:render
  },
  //@@viewOff:render
});

export default StudyMaterials;
