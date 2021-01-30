//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi } from "uu5g04-hooks";
import Config from "./config/config";
import "uu_productcatalogueg01";


//@@viewOff:imports

const StudyMaterialList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "StudyMaterialList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    studyMaterial: UU5.PropTypes.shape({
      name: UU5.PropTypes.shape.isRequired,
      desc: UU5.PropTypes.shape.isRequired,
      id: UU5.PropTypes.isRequired,
    }),
    // studyForm: UU5.PropTypes.string,
    onDetail: UU5.PropTypes.func,
    onUpdateTopic: UU5.PropTypes.func,
    onDeleteTopic: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: {},
    onDetail: () => { },
    onUpdateTopic: () => { },
    onDeleteTopic: () => { },
  },
  //@@viewOff:defaultProps

  render({ studyMaterials,formOfStudy, subject, language}) {

    // const fullTime = useLsi({
    //   cs: subject.language.cs.formOfStudy.fulltime.studyMaterialList,
    //   en: subject.language.en.formOfStudy.fulltime.studyMaterialList,
    // });
    // const partTime = useLsi({
    //   cs: subject.language.cs.formOfStudy.parttime.studyMaterialList,
    //   en: subject.language.en.formOfStudy.parttime.studyMaterialList,
    // });
    // const language = useLsi({
    //   cs: "cs",
    //   en: "en",
    // });

    let content = studyMaterials.map(item => {
      return <UuProductCatalogue.Bricks.ProductInfo
        type={item.data.type}
        baseUri={item.data.baseUri}
        colorSchema="green"
      />
    });

    console.log("Subject ******************");
    console.log(formOfStudy, language);
    console.log("Subject ******************");
   
    return (
      <>
        <UU5.Bricks.Accordion data={studyMaterials} >
          <UU5.Bricks.Panel
            header={<UU5.Bricks.Lsi lsi={{ en: "Books", cs: "Knihy" }} />}
            content={content}
            style={"font-size:large"}
            colorSchema="blue"
            iconExpanded="mdi-chevron-up"
            iconCollapsed="mdi-chevron-down"
          />
        </UU5.Bricks.Accordion>
      </>
    );
    //@@viewOff:render
  },
});

export default StudyMaterialList;

//@@viewOn:imports
