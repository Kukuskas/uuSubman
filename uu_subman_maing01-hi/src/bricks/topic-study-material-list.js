//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "./config/config";
import Uu5Tiles from "uu5tilesg02";
import "uu_productcatalogueg01";
import StudyMaterialProvider from "./study-material-provider";

//@@viewOff:imports

const TopicStudyMaterial = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "TopicStudyMaterial",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subjectId: UU5.PropTypes.string,
    formOfStudy: UU5.PropTypes.string,
    language: UU5.PropTypes.string,
    topicStudyMaterialList: UU5.PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subjectId: null,
    formOfStudy: "fulltime",
    language: "cs",
    topicStudyMaterialList: [],
  },
  //@@viewOff:defaultProps

  render({ topicStudyMaterialList, subjectId, formOfStudy, language }) {
    //@@viewOn:hooks
    const [booksSM, setBooksSM] = useState(true)
    const [videosSM, setVideosSM] = useState(true)
    const [coursesSM, setCoursesSM] = useState(true)
    //@@viewOff:hooks


    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }
    function renderReady(studyMaterials) {

      const booksStudyMat = topicStudyMaterialList.some((item) => {
        return item.type === "books"
      })
      const videosStudyMat = topicStudyMaterialList.some((item) => {
        return item.type === "videos"
      })
      const coursesStudyMat = topicStudyMaterialList.some((item) => {
        return item.type === "courses"
      })
      if (booksStudyMat) { setBooksSM(false) }
      if (videosStudyMat) { setVideosSM(false) }
      if (coursesStudyMat) { setCoursesSM(false) }

      return (
        <>
       
          <Uu5Tiles.ControllerProvider data ={topicStudyMaterialList}>
            <UU5.Bricks.Header level={4} content="Books" hidden={booksSM} />
            <UU5.Bricks.Line hidden={booksSM}  />
            <Uu5Tiles.Grid tileMaxWidth={100} passAllTileProps={true} >
              {books}
            </Uu5Tiles.Grid>
          </Uu5Tiles.ControllerProvider>
          <Uu5Tiles.ControllerProvider data={topicStudyMaterialList}>
            <UU5.Bricks.Header level={4} content="Videos" hidden={videosSM} />
            <UU5.Bricks.Line hidden={videosSM}  />
            <Uu5Tiles.Grid tileMaxWidth={100} passAllTileProps={true}  >
              {videos}
            </Uu5Tiles.Grid>
          </Uu5Tiles.ControllerProvider>
          <Uu5Tiles.ControllerProvider data={topicStudyMaterialList}>
            <UU5.Bricks.Header level={4} content="Courses" hidden={coursesSM} />
            <UU5.Bricks.Line hidden={coursesSM}  />
            <Uu5Tiles.Grid tileMaxWidth={100} passAllTileProps={true}>
              {courses}
            </Uu5Tiles.Grid>
          </Uu5Tiles.ControllerProvider>


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
    

    function books(attrs) {
      
     console.log("name");
     console.log(attrs);

      if (attrs.data.type == "books") {
        return <div {...attrs}>
          <UuProductCatalogue.Bricks.ProductInfo
            type="4x3"
            baseUri={attrs.data.url}
            colorSchema="green"
            showName={false}
            
          />
        
           <UU5.Bricks.Header level={6} content={attrs.data.name} />
        </div>
      } else
        return <> </>

    }
    function videos(attrs) {
      if (attrs.data.type == "videos") {
        return <div {...attrs}>
          <UU5.Bricks.Video
            src={attrs.data.url}
            colorSchema="green"
            type="mp4"
            style={{ height: 140, paddingRight:10 }}
            showName={false}
          />
           <UU5.Bricks.Header level={6} content={attrs.data.name} />
           </div>

      } else
        return <> </>

    }
    function courses(attrs) {
      if (attrs.data.type == "courses") {
        return <div {...attrs}>
          <UuProductCatalogue.Bricks.ProductInfo
            type="4x3"
            baseUri={attrs.data.url}
            colorSchema="green"
            showName={false}
          />
           <UU5.Bricks.Header level={6} content={attrs.data.name} />
        </div>
      } else
        return <> </>

    }
    return (
      <StudyMaterialProvider subjectId={subjectId} language={language} formOfStudy={formOfStudy}>
        {({ state, data, errorData, pendingData, handlerMap }) => {

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

export default TopicStudyMaterial;
