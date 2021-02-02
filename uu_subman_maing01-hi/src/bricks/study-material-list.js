//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useContext, useSession } from "uu5g04-hooks";
import Config from "./config/config";
import UuMall from "uu_mall";
import "uu_productcatalogueg01";
import StudyMaterialCreateForm from "./study-material-create-form";
import Uu5Tiles from "uu5tilesg02";
import SubmanMainContext from "../bricks/subman-main-context";


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
    onDeleteStudyMaterial: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: {},
    onDeleteStudyMaterial: () => { },
    onAddStudyMaterial: () => { },
  },
  //@@viewOff:defaultProps

  render({ studyMaterials, onDeleteStudyMaterial, language, formOfStudy, subjectId, onAddStudyMaterial, subject }) {
    const { identity } = useSession();
    const contextData = useContext(SubmanMainContext);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [currentType, setCurrentType] = useState("");
    function handleDeleteStudyMaterial(item) {
      onDeleteStudyMaterial({
        id: subjectId,
        data: { id: item.id },
        language: language,
        formOfStudy: formOfStudy,
      });
    }
    function canManage() {
      if (identity == null) {
        return false
      }
      const isTeacher = subject.teachers.some((teacher) => teacher === identity.uuIdentity);
      const isGarant = subject.supervisor === identity.uuIdentity;
      const isAuthority = contextData?.data?.authorizedProfileList?.some(
        (profile) => profile === Config.Profiles.AUTHORITIES
      );
      console.log(isTeacher);
      console.log("StudyMaterials+++++++++++++++++");
      return isAuthority || isTeacher || isGarant;
      
    }
  
    function handleOpenCreateStudyMaterialForm(type) {
      setCurrentType(type)
      setShowCreateModal(true);

    }

    function handleCloseCreteStudyMaterialForm() {
      setShowCreateModal(false);
    }

    function handleCreateStudyMaterialSave(opt) {
      let it = opt.values;
      const input = {
        id: subjectId,
        data: {
          baseUri: it.baseUri,
          type: it.type,
          name: it.name,
          productCode: ""
        },
        language: language,
        formOfStudy: formOfStudy,
      };
      onAddStudyMaterial(input)
      setShowCreateModal(false);
      console.log("Onoonon");
      console.log(input);
      console.log("Onoonon");
    }

    let books = studyMaterials.map(item => {
      if (item.type == "books") {
        return <>
          <UuProductCatalogue.Bricks.ProductInfo
            type="16x9"
            baseUri={item.baseUri}
            colorSchema="green"
          />
          {canManage() && (<UU5.Bricks.Button size="s"
            onClick={() => handleDeleteStudyMaterial(item)}
            bgStyle="transparent">
            <UU5.Bricks.Icon icon="glyphicon-trash" />
          </UU5.Bricks.Button>)}
        </>
      }
    });
    let videos = studyMaterials.map(item => {
      if (item.type == "videos") {
        return <>
          <UU5.Bricks.Video
            src={item.baseUri}
            colorSchema="green"
            type="mp4"
            style={{ height: 140 }}
          />
          <UU5.Bricks.Header level={4} content={item.name} />
          {canManage() && (<UU5.Bricks.Button size="s"
            onClick={() => handleDeleteStudyMaterial(item)}
            bgStyle="transparent">
            <UU5.Bricks.Icon icon="glyphicon-trash" />
          </UU5.Bricks.Button>)}
        </>
      }
    });
    let courses = studyMaterials.map(item => {
      if (item.type == "courses") {
        return <>
          <UuMall.Bricks.Product
            productCode={item.productCode}
            baseUri={item.baseUri}
            colorSchema="green"
          />
          {canManage() && (<UU5.Bricks.Button size="s"
            onClick={() => handleDeleteStudyMaterial(item)}
            bgStyle="transparent">
            <UU5.Bricks.Icon icon="glyphicon-trash" />
          </UU5.Bricks.Button>)}
        </>
      }
    });

    return (
      <>

        <StudyMaterialCreateForm
          shown={showCreateModal}
          type={currentType}
          onSave={handleCreateStudyMaterialSave}
          onCancel={handleCloseCreteStudyMaterialForm}
        />

        {canManage() && (<UU5.Bricks.Button size="s"
          onClick={() => handleOpenCreateStudyMaterialForm("books")}
          bgStyle="filled">
          <UU5.Bricks.Lsi lsi={{ en: "Add a Book", cs: "Přidat Knihu" }} />
          <UU5.Bricks.Icon icon="mdi-plus-circle" />
        </UU5.Bricks.Button>)}
        <UU5.Bricks.Accordion data={studyMaterials} >
          <UU5.Bricks.Panel
            header={<UU5.Bricks.Lsi lsi={{ en: "Books", cs: "Knihy" }} />}
            content={books}
            style={"font-size:large"}
            colorSchema="blue"
            iconExpanded="mdi-chevron-up"
            iconCollapsed="mdi-chevron-down"
          />
        </UU5.Bricks.Accordion>

        {canManage() && (<UU5.Bricks.Button size="s"
          onClick={() => handleOpenCreateStudyMaterialForm("videos")}
          bgStyle="filled">
          <UU5.Bricks.Lsi lsi={{ en: "Add a Video", cs: "Přidat Video" }} />
          <UU5.Bricks.Icon icon="mdi-plus-circle" />
        </UU5.Bricks.Button>)}
        <UU5.Bricks.Accordion data={studyMaterials} >
          <UU5.Bricks.Panel
            header={<UU5.Bricks.Lsi lsi={{ en: "Videos", cs: "Videa" }} />}
            content={videos}
            style={"font-size:large"}
            colorSchema="blue"
            iconExpanded="mdi-chevron-up"
            iconCollapsed="mdi-chevron-down"
          />
        </UU5.Bricks.Accordion>

        {canManage() && (<UU5.Bricks.Button size="s"
          onClick={() => handleOpenCreateStudyMaterialForm("courses")}
          bgStyle="filled">
          <UU5.Bricks.Lsi lsi={{ en: "Add a Course", cs: "Přidat Kurz" }} />
          <UU5.Bricks.Icon icon="mdi-plus-circle" />
        </UU5.Bricks.Button>)}
        <UU5.Bricks.Accordion data={studyMaterials} >
          <UU5.Bricks.Panel
            header={<UU5.Bricks.Lsi lsi={{ en: "Courses", cs: "Kurzy" }} />}
            content={courses}
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
