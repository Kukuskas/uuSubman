
//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useData } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "calls";
import StudyMaterialList from "./study-material-list"
//@@viewOff:imports

const StudyMaterials = createComponent({
    //@@viewOn:statics
    displayName: Config.TAG + "StudyMaterial",
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {
        subjectId: UU5.PropTypes.string,
        formOfStudy:UU5.PropTypes.string,
        language: UU5.PropTypes.string,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
        subjectId: null
    },
    //@@viewOff:defaultProps

    render({ subjectId, formOfStudy, language, onDeleteStudyMaterial, onAddStudyMaterial }) {
        //@@viewOn:hooks
        let dataValues = useData({
            dtoIn: { id: subjectId, language:language, formOfStudy:formOfStudy },
            onLoad: Calls.studyMaterialListSubject
        });

        let { viewState, errorState, error, syncData, asyncData } = dataValues;
        //@@viewOff:hooks

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
            onDeleteStudyMaterial={onDeleteStudyMaterial}
            onAddStudyMaterial={onAddStudyMaterial}
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
        switch (viewState) {
            case "load":
                return renderLoad();
            case "error":
                return renderError(errorState, error);
            default:
                return renderReady(asyncData);
        }
        //@@viewOff:render
    }
});

export default StudyMaterials;