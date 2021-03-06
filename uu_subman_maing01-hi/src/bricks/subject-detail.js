//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useLsi } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./config/lsi";
import "uu5g04-bricks";
import "uu5g04-block-layout";
import "uu5g04-forms";
import TeacherList from "./teacher-list";
import TopicList from "./topic-list";
import Css from "../routes/subject.css";
import SubjectUpdate from "./subject-update";
import StudyMaterials from "./study-materials";

//@@viewOff:imports

const Mode = {
  fulltime: <UU5.Bricks.Lsi lsi={Lsi.subjectFullTime} />,
  parttime: <UU5.Bricks.Lsi lsi={Lsi.subjectPartTime} />,
};

const SubjectDetail = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Subject",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subject: UU5.PropTypes.shape({
      name: UU5.PropTypes.shape({ cs: UU5.PropTypes.string, en: UU5.PropTypes.string }).isRequired,
      desc: UU5.PropTypes.shape({ cs: UU5.PropTypes.string, en: UU5.PropTypes.string }).isRequired,
      id: UU5.PropTypes.isRequired,
    }),
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
    onDeleteTopic: UU5.PropTypes.func,
    onAddTopic: UU5.PropTypes.func,
    onGetSubject: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: null,
    showButton: false,
    onUpdate: () => {},
    onDelete: () => {},
    onDeleteTopic: () => {},
    onAddTopic: () => {},
    onDeleteStudyMaterial: () => {},
    onAddStudyMaterial: () => {},
  },
  //@@viewOff:defaultProps

  render({ subject, onDelete, onUpdate, onUpdateTopic, onDeleteTopic, onAddTopic }) {
    const [studyForm, setStudyForm] = useState(Mode.fulltime);
    const [teacherList, setTeacherList] = useState(true);
    const teachers = [<TeacherList teachers={subject.teachers} />];

    function handleClick() {
      teacherList == true ? setTeacherList(false) : setTeacherList(true);
    }
    function handleSwitch() {
      studyForm == Mode.parttime ? setStudyForm(Mode.fulltime) : setStudyForm(Mode.parttime);
    }
    //@@viewOff:private

    //@@viewOn:render

    const language = useLsi({
      cs: "cs",
      en: "en",
    });
    let formOfStudy = studyForm.props.lsi.en == "Full-time" ? "fulltime" : "parttime";
    return (
      <>
        <Plus4U5.App.ArtifactSetter
          routeName="Subject Detail"
          header={<UU5.Bricks.Lsi lsi={subject.name} />}
          breadcrumbList={[
            {
              content: "Home",
              href: "./subjects",
            },
          ]}
          showBackButton
        />

        <UU5.Bricks.Section colorSchema="blue-grey">
          <UU5.Bricks.Box
            className={Css.detail()}
            style={{ backgroundColor: UU5.Environment.colors.teal.c50 }}
            borderRadius="8px"
          >
            <UU5.Bricks.Row>
              <UU5.Bricks.Header className="uu5-common-center" level={1} color="blue-gray">
                {<UU5.Bricks.Lsi lsi={subject.name} color="blue-gray" />}
              </UU5.Bricks.Header>
              <SubjectUpdate onUpdate={onUpdate} onDelete={onDelete} subject={subject} />
            </UU5.Bricks.Row>
          </UU5.Bricks.Box>

          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="s-4">
              <UU5.BlockLayout.Tile borderRadius="8px" margin="5px">
                <UU5.Bricks.Icon icon="uubml-diploma" />
                {<UU5.Bricks.Lsi lsi={Lsi.subjectCredits} />}
                {subject.credits}
              </UU5.BlockLayout.Tile>

              <div onClick={handleClick} className={Css.cursor()}>
                <UU5.BlockLayout.Tile borderRadius="8px" margin="5px" className="uu5-elevation-hover-1">
                  <UU5.Bricks.Icon icon="uubml-officer-junior-man" />
                  {<UU5.Bricks.Lsi lsi={{ en: "Teachers", cs: "Učitelé" }} />}
                </UU5.BlockLayout.Tile>
              </div>
            </UU5.Bricks.Column>

            <UU5.Bricks.Column colWidth="s-4">
              <UU5.BlockLayout.Tile borderRadius="8px" margin="5px">
                <UU5.Bricks.Icon icon="uubml-idea" />
                {<UU5.Bricks.Lsi lsi={Lsi.subjectLanguage} />}
                {subject.languageOfStudy}
              </UU5.BlockLayout.Tile>

              <div onClick={handleSwitch} className={Css.cursor()}>
                <UU5.BlockLayout.Tile
                  borderRadius="8px"
                  margin="5px"
                  className="uu5-elevation-hover-1 "
                  colorSchema="blue-grey"
                >
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

          <UU5.Bricks.Text hidden={teacherList} content={teachers} />

          <UU5.Bricks.Box colorSchema="default">
            <UU5.Bricks.Section content={<UU5.Bricks.Lsi lsi={subject.desc} />}/>
            <UU5.Bricks.Line/>
          </UU5.Bricks.Box>
          <TopicList
            subject={subject}
            studyForm={studyForm.props.lsi.en}
            onUpdateTopic={onUpdateTopic}
            onDeleteTopic={onDeleteTopic}
            onAddTopic={onAddTopic}
            formOfStudy={formOfStudy}
            language={language}
            margin="5px"
          />
          <StudyMaterials subjectId={subject.id} subject={subject} formOfStudy={formOfStudy} language={language} />
        </UU5.Bricks.Section>
      </>
    );
  },
  //@@viewOff:render
});

export default SubjectDetail;
