//@@viewOn:imports
import UU5 from "uu5g04";
<<<<<<< HEAD
<<<<<<< HEAD
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOn:imports 

const Topic = createVisualComponent({
    //@@viewOn: statics
    displayName: Config.TAG + "Topic",
    //@@viewOff:statics

    //@@viewOn: propTypes
    propTypes: {
        topic: UU5.PropTypes.shape({
            name: UU5.PropTypes.string.isRequired,
            desc: UU5.PropTypes.string.isRequired, 
            studyMaterialList: UU5.PropTypes.array.isRequired,
            onDetail: UU5.PropTypes.func,
            onUpdate: UU5.PropTypes.func, 
            onDelete: UU5.PropTypes.func
        })
    },
    //@@viewOff: propTypes

    //@@viewOn: defaultProps
    defaultProps: {

    },
    //@@viewOff: defaultProps



    render({topic, onDetail, onUpdate, onDelete}){
        //@@viewOn:private 
        /*
        function handleDetail(id){

        }

        function handleUpdate(id){

        }

        function handleDelete(id){

        }
        */
        //@@viewOff:private 

        //@@viewOn:render 
        function renderHeader() {
            return (
              <>
                <h1>{topic.name}</h1>
                <p>{topic.desc}</p>
              </>
            )
        }

        function renderStudyMaterial(){
            return (<p>
                Video, uuBook, uuCourse ...
            </p>)
        }

        function renderDescribe(){
          
        }

        return (
            <UU5.Bricks.Column colWidth="xs12 s8 m10 l8">
                <UU5.Bricks.Panel header={renderHeader} size="m" iconCollapsed="mdi-chevron-down" iconExpanded="mdi-chevron-up"> 
                      <UU5.Bricks.Row>
                          <UU5.Bricks.Column colWidth="xs8 s6 m4 l4 xl4">
                                  <UU5.Bricks.Card colorSchema="orange" >
                                        {topic.desc}
                                  </UU5.Bricks.Card>
                            </UU5.Bricks.Column>
                        
                            <UU5.Bricks.Column colWidth="xs8 s6 m4 l4 xl4">
                                <UU5.Bricks.Card colorSchema="orange" >
                                    <UU5.Bricks.Video src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"/>
                                </UU5.Bricks.Card>
                            </UU5.Bricks.Column>

                            <UU5.Bricks.Column colWidth="xs8 s6 m4 l4 xl4">
                                <UU5.Bricks.Card colorSchema="orange" >
                                      {topic.desc}
                                </UU5.Bricks.Card>
                            </UU5.Bricks.Column>
                        </UU5.Bricks.Row>  
                </UU5.Bricks.Panel>
            </UU5.Bricks.Column>
        )
        //@@viewOff:render 

    }
})

export default Topic; 
=======
=======
>>>>>>> 2d233819f600349ea1cb86f2d03a72865f36a88a
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "./config/config";
import Uu5Tiles from "uu5tilesg02";
import Css from "../routes/subject.css";
import Test from "./test";
//@@viewOff:imports

const Topic = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "TopicList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    // topic: UU5.PropTypes.array.isRequired, //EDIT
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {

    topics: [],  //EDIT
    onDetail: () => { },
    onUpdate: () => { },
    onDelete: () => { }
  },
  //@@viewOff:defaultProps

  render({ topic, onDetail, onUpdate, onDelete }) { //EDIT
    //@@viewOn:render
    const [studyMaterials, setStudyMaterials] = useState(true);
    function handleClick() {
      studyMaterials == true ? setStudyMaterials(false) : setStudyMaterials(true)
    }
    return (
      <>

        <div onClick={handleClick}  >
          <UU5.Bricks.Box colorSchema="green" borderRadius="8px">
            <UU5.Bricks.Section content={topic.name} margin="5px" className={Css.topic()} icon="uu5-arrow-down" />
            <UU5.Bricks.Section content={topic.desc} margin="5px" />
          </UU5.Bricks.Box>
        </div>
        <UU5.Bricks.Section
          hidden={studyMaterials}
          content={<Test />}
        >
        </UU5.Bricks.Section>
      </>

    );
    //@@viewOff:render
  }
});

export default Topic;
<<<<<<< HEAD
>>>>>>> bfef33d17a37f17233c864caccfa76fbc86b96c8
=======
>>>>>>> 2d233819f600349ea1cb86f2d03a72865f36a88a
