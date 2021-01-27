//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useSession, useContext, useState  } from "uu5g04-hooks";
import Config from "./config/config";
import UuProductCatalogue from "uu_productcatalogueg01"


//@@viewOff:imports

const StudyMaterial = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "StudyMaterial",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    // studyMaterialList: UU5.PropTypes.array.isRequired, //EDIT
    onDetail: UU5.PropTypes.func,

  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: {}, //EDIT
    onDetail: () => {},

  },
  //@@viewOff:defaultProps

  render({ studyMaterial, language, formOfStudy }) {
    //EDIT
    //@@viewOn:render


   console.log(studyMaterial);
console.log("Catalogue");
   console.log(UuProductCatalogue)

    return (
        <>

    {/* <UuProductCatalogue.Bricks.ProductInfo  type={studyMaterial.type}baseUri={studyMaterial.baseUri} tags='<uu5json/>["new"]'/> */}
    <UuProductCatalogue.Bricks.ProductInfo

  type="4x3"
  baseUri="https://uuos9.plus4u.net/uu-coursekitg01-course/99923616732453117-9b3e6c4818d54a55a0a9655345b549ce/"
  tags='<uu5json/>["hot"]'
/>
    </>
    );
    //@@viewOff:render
  },
});

export default StudyMaterial;
