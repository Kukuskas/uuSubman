//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi } from "uu5g04-hooks";
import Config from "./config/config";
import Uu5Tiles from "uu5tilesg02";
import "uu_productcatalogueg01";

//@@viewOff:imports

const StudyMaterialBooksList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "StudyMaterialBooksList",
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

  render({ subject, studyForm }) {

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

      if (item.length === 0) {
        return <UU5.Common.Error content="WTF No there is no study materials!" />;
      } else {
        return (
          item.data.productCode == "Books" ?
            <UuProductCatalogue.Bricks.ProductInfo
              type={item.data.type}
              baseUri={item.data.baseUri}
              studyMaterial={item.data}
              colorSchema="green"
              id={subject.id}
              formOfStudy={studyForm == "Full-time" ? "fulltime" : "parttime"}
              language={language}
            /> : null
        );
      }
    }


    return (
      <Uu5Tiles.Grid data={studyForm == "Full-time" ? fullTime : partTime}
       tileHeight="auto"
        tileMinWidth={200}
        tileMaxWidth={400}
        tileSpacing={8}
        rowSpacing={8}>
        {renderItem}
      </Uu5Tiles.Grid>
    );
    //@@viewOff:render
  },
});

export default StudyMaterialBooksList;

//@@viewOn:imports
