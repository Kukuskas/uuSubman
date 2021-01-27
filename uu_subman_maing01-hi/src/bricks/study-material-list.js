//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi } from "uu5g04-hooks";
import Config from "./config/config";
import StudyMaterial from "./study-material";
import Uu5Tiles from "uu5tilesg02";


//@@viewOff:imports

const StudyMaterialList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "StudyMaterialList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subject: UU5.PropTypes.shape({
      name: UU5.PropTypes.shape.isRequired,
      desc: UU5.PropTypes.shape.isRequired,
      id: UU5.PropTypes.isRequired,
    }),
    studyForm: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: {},
    studyForm: "Full-time",
  },
  //@@viewOff:defaultProps

  render({ subject, studyForm}) {
  console.log();
    console.log(subject);
    console.log(studyForm);
    //@@viewOn:render
    const fullTime = useLsi({
      cs: subject.language.cs.formOfStudy.fulltime.studyMaterialList,
      en: subject.language.en.formOfStudy.fulltime.studyMaterialList,
    });
    const partTime = useLsi({
      cs: subject.language.cs.formOfStudy.parttime.studyMaterialList,
      en: subject.language.en.formOfStudy.parttime.studyMaterialList,
    });
    const language = useLsi({
      cs: "cs",
      en: "en",
    });
    function renderItem(item) {
        console.log(item);
      if (item.length === 0) {
        return <UU5.Common.Error content="WTF No there is no study materials!" />;
      } else {
        return (
          <StudyMaterial
            studyMaterial={item.data}
            colorSchema="green"
            id={subject.id}
            formOfStudy={studyForm == "Full-time"?"fulltime":"parttime"}
            language= {language}
          />
        );
      }
    }
 

    return (    
         <Uu5Tiles.Grid data={studyForm == "Full-time" ? fullTime : partTime} tileHeight="auto" rowSpacing={8}>
          {renderItem}
        </Uu5Tiles.Grid>
    );
    //@@viewOff:render
  },
});

export default StudyMaterialList;

//@@viewOn:imports
