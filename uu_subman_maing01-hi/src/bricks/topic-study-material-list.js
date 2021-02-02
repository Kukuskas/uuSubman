

//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Uu5Tiles from "uu5tilesg02";
import "uu_productcatalogueg01";


//@@viewOff:imports

const TopicStudyMaterialList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "TopicStudyMaterialList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    topicStudyMaterialList: UU5.PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    topicStudyMaterialList: [],
  },
  //@@viewOff:defaultProps

  render({ topicStudyMaterialList }) {
    //@@viewOn:hooks

    function books(item) {
      if (item.data.type == "books") {
        return <div {...item}>
          <UuProductCatalogue.Bricks.ProductInfo
            type="4x3"
            baseUri={item.data.url}
            colorSchema="green"
            showName={false}
          />
          <UU5.Bricks.Header level={6}
           content={item.data.name}
           className="uu5-common-center"/>
        </div>
      } else
        return <> </>

    }
    function videos(item) {
      if (item.data.type == "videos") {
        return <div {...item}>
          <UU5.Bricks.Video
            src={item.data.url}
            colorSchema="green"
            type="mp4"
            style={{ height: 140, paddingRight: 10, paddingLeft: 12 }}
            showName={false}
          />
          <UU5.Bricks.Header level={6}
          className="uu5-common-center"
           content={item.data.name} />
        </div>

      } else
        return <> </>

    }
    function courses(item) {
      if (item.data.type == "courses") {
        return <div {...item}>
          <UuProductCatalogue.Bricks.ProductInfo
            type="4x3"
            baseUri={item.data.url}
            colorSchema="green"
            showName={false}
          />
          <UU5.Bricks.Header level={6}
           className="uu5-common-center"
            content={item.data.name} />
        </div>
      } else
        return <> </>
    }

    return (
      <>

        <Uu5Tiles.ControllerProvider data={topicStudyMaterialList}>
          <UU5.Bricks.Header level={4} content="Books" />
          <Uu5Tiles.Grid tileMaxWidth={200} passAllTileProps={true}  >
            {books}
          </Uu5Tiles.Grid>
        </Uu5Tiles.ControllerProvider>

        <Uu5Tiles.ControllerProvider data={topicStudyMaterialList}>
          <UU5.Bricks.Header level={4} content="Videos" />
          <UU5.Bricks.Line />
          <Uu5Tiles.Grid tileMaxWidth={200} passAllTileProps={true}  >
            {videos}
          </Uu5Tiles.Grid>
        </Uu5Tiles.ControllerProvider>
        <Uu5Tiles.ControllerProvider data={topicStudyMaterialList}>
          <UU5.Bricks.Header level={4} content="Courses" />
          <UU5.Bricks.Line />
          <Uu5Tiles.Grid tileMaxWidth={200} passAllTileProps={true}  >
            {courses}
          </Uu5Tiles.Grid>
        </Uu5Tiles.ControllerProvider>
      </>
    );
    //@@viewOff:render
  },
});

export default TopicStudyMaterialList;


