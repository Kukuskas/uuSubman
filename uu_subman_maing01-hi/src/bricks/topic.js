//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useSession, useContext, useState } from "uu5g04-hooks";
import Config from "./config/config";
import SubjectUpdateTopic from "./subject-update-topic";
import SubmanMainContext from "../bricks/subman-main-context";
import TopicStudyMaterialList from "./topic-study-material-list";
import Css from "../routes/subject.css";

//@@viewOff:imports

const Topic = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "TopicList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    // topic: UU5.PropTypes.shape({
    //   name: UU5.PropTypes.string,
    //   desc: UU5.PropTypes.string.isRequired,
    //   studyMaterialList: UU5.PropTypes.array,
    //   id: UU5.PropTypes.isRequired,
    // }), 
    onUpdateTopic: UU5.PropTypes.func,
    onDeleteTopic: UU5.PropTypes.func,
    subjectId: UU5.PropTypes.string,
    formOfStudy: UU5.PropTypes.string,
    language: UU5.PropTypes.string,
    // teachers: UU5.PropTypes.array,
    // supervisor: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    // topic: {}, 
    onUpdateTopic: () => {},
    onDeleteTopic: () => {},
    subjectId: null,
    formOfStudy: "fulltime",
    language: "cs",
    // teachers: [],
    // supervisor: null,
  },
  //@@viewOff:defaultProps

  render({ topic, onUpdateTopic, onDeleteTopic, teachers, supervisor, subjectId, language, formOfStudy }) {
    //EDIT
    //@@viewOn:render
    const { identity } = useSession();
    const contextData = useContext(SubmanMainContext);

    function canManage() {
      if (identity==null) {
        return false        
      }
      const isTeacher = teachers.some((teacher) => teacher === identity.uuIdentity);
      const isGarant = supervisor === identity.uuIdentity;
      const isAuthority = contextData?.data?.authorizedProfileList?.some(
        (profile) => profile === Config.Profiles.AUTHORITIES
      );
      return isAuthority || isTeacher || isGarant;
    }
    

    function deleteTopicParams() {
      onDeleteTopic({
        id: subjectId,
        data: { id: topic.id },
        formOfStudy: formOfStudy,
        language: language,
      });
    }

    return (
      <>
        {canManage() && (
          <UU5.Bricks.Row>
            <SubjectUpdateTopic
              onUpdateTopic={onUpdateTopic}
              topic={topic}
              language={language}
              formOfStudy={formOfStudy}
              id={subjectId}
            />
            <UU5.Bricks.Button size="s" onClick={deleteTopicParams}
             className={Css.trashes()} bgStyle="transparent" colorSchema="blue">
              <UU5.Bricks.Icon icon="glyphicon-trash" />
            </UU5.Bricks.Button>
          </UU5.Bricks.Row>
        )}
        <UU5.Bricks.Section content={topic.name} />
        <UU5.Bricks.Accordion>
          <UU5.Bricks.Panel
            borderRadius="8px"
            header={topic.desc}
            content={canManage()?(<TopicStudyMaterialList
               topicStudyMaterialList={topic.studyMaterialList} 
               subjectId={subjectId}
               language={language} 
               formOfStudy={formOfStudy}
               />):null}
            colorSchema="grey"
            iconExpanded="mdi-chevron-up"
            iconCollapsed={canManage()?"mdi-chevron-down":null}
            onClickNotCollapseOthers={true}
            openClick={canManage()?null:"none"}
          />
        </UU5.Bricks.Accordion>
      </>
    );
    //@@viewOff:render
  },
});

export default Topic;
