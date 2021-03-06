//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi, useSession, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import Topic from "./topic";
import Uu5Tiles from "uu5tilesg02";
import SubmanMainContext from "../bricks/subman-main-context";

//@@viewOff:imports

const TopicList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "TopicList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subject: UU5.PropTypes.shape({
      name: UU5.PropTypes.shape({ cs: UU5.PropTypes.string, en: UU5.PropTypes.string }).isRequired,
      desc: UU5.PropTypes.shape({ cs: UU5.PropTypes.string, en: UU5.PropTypes.string }).isRequired,
      id: UU5.PropTypes.isRequired,
    }),
    formOfStudy: UU5.PropTypes.string,
    onUpdateTopic: UU5.PropTypes.func,
    onDeleteTopic: UU5.PropTypes.func,
    onAddTopic: UU5.PropTypes.func,
    language: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: {},
    formOfStudy: "Full-time",
    onUpdateTopic: () => {},
    onDeleteTopic: () => {},
    onAddTopic: () => {},
    language: null,
  },
  //@@viewOff:defaultProps

  render({ subject, formOfStudy, onUpdateTopic, onDeleteTopic, onAddTopic, language }) {
    const { identity } = useSession();
    const contextData = useContext(SubmanMainContext);

    function canManage() {
      if (identity == null) {
        return false;
      }
      const isTeacher = subject.teachers.some((teacher) => teacher === identity.uuIdentity);
      const isGarant = subject.supervisor === identity.uuIdentity;
      const isAuthority = contextData?.data?.authorizedProfileList?.some(
        (profile) => profile === Config.Profiles.AUTHORITIES
      );
      return isAuthority || isTeacher || isGarant;
    }

    //@@viewOn:render
    const fullTime = useLsi({
      cs: subject.language.cs.formOfStudy.fulltime.topics,
      en: subject.language.en.formOfStudy.fulltime.topics,
    });
    const partTime = useLsi({
      cs: subject.language.cs.formOfStudy.parttime.topics,
      en: subject.language.en.formOfStudy.parttime.topics,
    });

    function renderItem(item) {
      if (item.length === 0) {
        return <UU5.Common.Error content="WTF No topics!" />;
      } else {
        return (
          <Topic
            topic={item.data}
            onUpdateTopic={onUpdateTopic}
            onDeleteTopic={onDeleteTopic}
            teachers={subject.teachers}
            supervisor={subject.supervisor}
            subjectId={subject.id}
            formOfStudy={formOfStudy}
            language={language}
          />
        );
      }
    }

    function addTopicParams() {
      onAddTopic({
        id: subject.id,
        formOfStudy: formOfStudy,
        language: language,
      });
    }

    return (
      <>
        <UU5.Bricks.Section>
          {canManage() && (<UU5.Bricks.Button
            size="s"
            bgStyle="filled"
            onClick={addTopicParams} colorSchema="blue-rich">
            <UU5.Bricks.Lsi lsi={{ en: "Add topic", cs: "Přidat téma" }} />
            <UU5.Bricks.Icon icon="mdi-plus-circle" />
          </UU5.Bricks.Button>)}
          <Uu5Tiles.Grid data={formOfStudy == "fulltime" ? fullTime : partTime} tileHeight="auto" rowSpacing={8}>
            {renderItem}
          </Uu5Tiles.Grid>
        </UU5.Bricks.Section>
      </>
    );
    //@@viewOff:render
  },
});

export default TopicList;

//@@viewOn:imports
