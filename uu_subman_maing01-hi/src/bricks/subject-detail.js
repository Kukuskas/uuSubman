//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./config/lsi";
import "uu5g04-bricks";
import "uu5g04-block-layout";
import "uu5g04-forms";
import TeacherList from "./teacher-list";
import TopicList from "./topic-list";
import Css from "../routes/detail.css";
import SubjectUpdate from "../bricks/subject-update";



//@@viewOff:imports


const Mode = {
  FULLTIME: <UU5.Bricks.Lsi lsi={Lsi.subjectFullTime} />,
  PARTTIME: <UU5.Bricks.Lsi lsi={Lsi.subjectPartTime} />,
};

const SubjectDetail = createVisualComponent({
  
  //@@viewOn:statics
  displayName: Config.TAG + "Subject",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subject: UU5.PropTypes.shape({
      name: UU5.PropTypes.shape.isRequired,
      desc: UU5.PropTypes.shape.isRequired,
      id: UU5.PropTypes.isRequired,
    }),
    colorSchema: UU5.PropTypes.string,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: null,
    colorSchema: "blue",
    onUpdate: () => { },
     onDelete: () => { },
  },
  //@@viewOff:defaultProps



  render({ subject, colorSchema, onDelete, onUpdate }) {
    const [studyForm,setStudyForm] = useState(Mode.FULLTIME);

    //@@viewOn:private
    function handleClick() {
      SubjectDetail.modal.open()
    }
    function handleClose() {
      SubjectDetail.modal.close()
    }
    
    function handleSwitch() {
      studyForm == Mode.PARTTIME ? setStudyForm(Mode.FULLTIME):
       setStudyForm(Mode.PARTTIME)
    }
    //@@viewOff:private

    //@@viewOn:render


    return (

      <>
      <Plus4U5.App.ArtifactSetter 
        routeName="Subject Detail"
        header={<UU5.Bricks.Lsi lsi={subject.name} />}
        breadcrumbList={[
          {
            content: "Home", href: "./subjects"
          }
        ]}
        showBackButton
      />

      <UU5.Bricks.Section >
        <UU5.Bricks.Box colorSchema="green" className={Css.detail()} >
          <UU5.Bricks.Row>
          <UU5.Bricks.Header className="uu5-common-center"  
            level={1}>
            {<UU5.Bricks.Lsi lsi={subject.name} />}
            </UU5.Bricks.Header>
             <SubjectUpdate  onUpdate={onUpdate} onDelete={onDelete} subject={subject}/>
            </UU5.Bricks.Row>
        </UU5.Bricks.Box>


        <UU5.Bricks.Row>
          <UU5.Bricks.Column colWidth="s-4">
            <UU5.BlockLayout.Tile borderRadius="8px" margin="5px">
              <UU5.Bricks.Icon icon="uubml-diploma" />
              {<UU5.Bricks.Lsi lsi={Lsi.subjectCredits} />}
              {subject.credits}
            </UU5.BlockLayout.Tile>

            <div onClick={handleClick}  >
              <UU5.BlockLayout.Tile borderRadius="8px" margin="5px" className={Css.cursor()}>
                <UU5.Bricks.Icon icon="uubml-officer-junior-man" />
                {<UU5.Bricks.Lsi lsi={{ en: "Teachers", cs: "Učitelé" }} />}
              </UU5.BlockLayout.Tile>
            </div>
            <UU5.Bricks.Modal ref_={modal => SubjectDetail.modal = modal}  > 
            <TeacherList teachers={subject.teachers}  /> <UU5.Bricks.Button  onClick= {handleClose} >close</UU5.Bricks.Button> 
            </UU5.Bricks.Modal>
          </UU5.Bricks.Column>


          <UU5.Bricks.Column colWidth="s-4" >
            <UU5.BlockLayout.Tile borderRadius="8px" margin="5px">
              <UU5.Bricks.Icon icon="uubml-idea" />
              {<UU5.Bricks.Lsi lsi={Lsi.subjectLanguage} />}
              {Object.keys(subject.language).join(" / ")} 
            </UU5.BlockLayout.Tile>


  
              <div onClick={handleSwitch} className={Css.cursor()}>
            <UU5.BlockLayout.Tile borderRadius="8px" margin="5px">
             {studyForm}
            </UU5.BlockLayout.Tile>
            </div>
          </UU5.Bricks.Column>


          <UU5.Bricks.Column colWidth="s-4">
            <UU5.BlockLayout.Tile borderRadius="8px" margin="5px">
              <UU5.Bricks.Icon icon="uubml-digital-workspace" />
              {<UU5.Bricks.Lsi lsi={Lsi.subjectDegree} />}
              {subject.degree}
            </UU5.BlockLayout.Tile>

            <UU5.BlockLayout.Tile borderRadius="8px" margin="5px">
              <UU5.Bricks.Icon icon="uubml-officer-junior-man" />
              {<UU5.Bricks.Lsi lsi={Lsi.subjectSupervisor} />}
              <Plus4U5.Bricks.BusinessCard uuIdentity={subject.supervisor} hidePhoto={true} visual="inline" />
            </UU5.BlockLayout.Tile>
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>


        <UU5.Bricks.Box >
          <UU5.Bricks.Block
            content={<UU5.Bricks.Lsi lsi={subject.desc} />} colorSchema="green" />
        </UU5.Bricks.Box>

        <TopicList subject={subject} />
      </UU5.Bricks.Section>
      </>

    );
  },
  //@@viewOff:render
});

export default SubjectDetail;
