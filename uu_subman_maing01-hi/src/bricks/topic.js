//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useSession, useContext, useState } from "uu5g04-hooks";
import Config from "./config/config";
import Uu5Tiles from "uu5tilesg02";
import Test from "./test";
import SubjectUpdateTopic from "./subject-update-topic";
import SubmanMainContext from "../bricks/subman-main-context";
//@@viewOff:imports

const Topic = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "TopicList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    // topic: UU5.PropTypes.array.isRequired, //EDIT
    onDetail: UU5.PropTypes.func,
    onUpdateTopic: UU5.PropTypes.func,
    onDeleteTopic: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    topics: [], //EDIT
    onDetail: () => {},
    onUpdateTopic: () => {},
    onDeleteTopic: () => {},
  },
  //@@viewOff:defaultProps

  render({ topic, onUpdateTopic, onDeleteTopic, teachers, supervisor, id, language, formOfStudy }) {
    //EDIT
    //@@viewOn:render
    const { identity } = useSession();
    const contextData = useContext(SubmanMainContext);
    const [changeTopic, setChangeTopic] = useState(topic);
    const [changeTopicName, setChangeTopicName] = useState(topic.name);

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
    let inpute;
    function handleChange(input) {
      inpute = input;
      setChangeTopic(inpute);

      return onUpdateTopic(input);
    }

    function deleteTopicParams() {
      onDeleteTopic({
        id: id,
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
              onUpdateTopic={handleChange}
              topic={topic}
              language={language}
              formOfStudy={formOfStudy}
              id={id}
            />
            <UU5.Bricks.Button size="s" onClick={deleteTopicParams} bgStyle="transparent">
              <UU5.Bricks.Icon icon="glyphicon-trash" />
            </UU5.Bricks.Button>
          </UU5.Bricks.Row>
        )}
        <UU5.Bricks.Section content={changeTopicName} />
        <UU5.Bricks.Accordion>
          <UU5.Bricks.Panel
            borderRadius="8px"
            header={changeTopic.desc}
            content={<Test />}
            colorSchema="grey"
            iconExpanded="mdi-chevron-up"
            iconCollapsed="mdi-chevron-down"
          />
        </UU5.Bricks.Accordion>
      </>
    );
    //@@viewOff:render
  },
});

export default Topic;
