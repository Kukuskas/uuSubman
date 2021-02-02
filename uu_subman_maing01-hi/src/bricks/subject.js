//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const Subject = createVisualComponent({
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
    onDetail: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: null,
    onDetail: () => {},
  },
  //@@viewOff:defaultProps

  render({ subject, onDetail }) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:render
    function renderHeader() {
      return <>{<UU5.Bricks.Lsi lsi={subject.name} />}</>;
    }

    if (!subject) {
      return null;
    }

    return (
      <>
        <div
          onClick={() => {
            onDetail(subject);
          }}
        >
          <UU5.Bricks.Card colorSchema="green">
            <UU5.Bricks.Strong>{renderHeader()}</UU5.Bricks.Strong>
            <UU5.Bricks.Section content={<UU5.Bricks.Lsi lsi={subject.desc} />} />
            <UU5.Bricks.Text content={subject.credits} />
            <UU5.Bricks.Text colorSchema="red">click to see detail</UU5.Bricks.Text>
          </UU5.Bricks.Card>
        </div>
      </>
    );
    //@@viewOff:render
  },
});

export default Subject;
