//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useSession, useContext } from "uu5g04-hooks";
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
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    topics: [], //EDIT
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render({ topic, onDetail, onSave, onUpdate, onDelete, teachers, supervisor, subject }) {
    //EDIT
    //@@viewOn:render
    const { identity } = useSession();
    const contextData = useContext(SubmanMainContext);

    function canManage() {
      const isTeacher = teachers.some((teacher) => teacher === identity.uuIdentity);
      const isGarant = supervisor === identity.uuIdentity;
      const isAuthority = contextData?.data?.authorizedProfileList?.some(
        (profile) => profile === Config.Profiles.AUTHORITIES
      );
      return isAuthority || isTeacher || isGarant;
    }
    console.log("its topic");
    console.log(topic);
    return (
      <>
        {canManage() && (
          <SubjectUpdateTopic onSave={onSave} onUpdate={onUpdate} onDelete={onDelete} topic={topic} subject={subject} />
        )}
        <UU5.Bricks.Section content={topic.name} />
        <UU5.Bricks.Accordion>
          <UU5.Bricks.Panel
            borderRadius="8px"
            header={topic.desc}
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
