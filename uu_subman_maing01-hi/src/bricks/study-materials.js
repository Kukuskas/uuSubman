//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import StudyMaterialList from "./study-material-list";
import StudyMaterialProvider from "./study-material-provider";

//@@viewOff:imports

const StudyMaterials = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "StudyMaterial",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subjectId: UU5.PropTypes.string,
    formOfStudy: UU5.PropTypes.string,
    language: UU5.PropTypes.string,

  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subjectId: null,
    formOfStudy: "fulltime",
    language: "cs",

  },
  //@@viewOff:defaultProps

  render({ subjectId, formOfStudy, language, subject }) {
    const deleteStudyMaterialSubjectRef = useRef();
    const addStudyMaterialSubjectRef = useRef();
    async function handleDeleteStudyMaterial(studyMaterial) {
      try {
        await deleteStudyMaterialSubjectRef.current(studyMaterial);
      } catch {
        showError(`Deletion of the study material failed!`);
      }
    }
    async function handleAddStudyMaterial(studyMaterial) {
      try {
        await addStudyMaterialSubjectRef.current(studyMaterial);
      } catch {
        showError(`Adding of the study material failed!`);
      }
    }

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
            formOfStudy={formOfStudy}
            language={language}
            subjectId={subjectId}
            onDeleteStudyMaterial={handleDeleteStudyMaterial}
            onAddStudyMaterial={handleAddStudyMaterial}
            subject={subject}
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
      <StudyMaterialProvider subjectId={subjectId} language={language} formOfStudy={formOfStudy}>
        {({ state, data, errorData, pendingData, handlerMap }) => {
          deleteStudyMaterialSubjectRef.current = handlerMap.deleteStudyMaterialSubject;
          addStudyMaterialSubjectRef.current = handlerMap.addStudyMaterialSubject;

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
    );

    //@@viewOff:render
  },
});

export default StudyMaterials;
