//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import "uu5g04-forms";
import FormUpdateTopic from "./form-update-topic";
import SubmanMainContext from "../bricks/subman-main-context";

//@@viewOff:imports

const SubjectUpdateFormTopic = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectUpdateFormTopic",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subject: UU5.PropTypes.shape({
      name: UU5.PropTypes.shape.isRequired,
      desc: UU5.PropTypes.shape.isRequired,
      id: UU5.PropTypes.isRequired,
    }),
    onSubmit: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: null,
    onSubmit: () => {},
    onCancel: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render({ onSave, onCancel, onDelete, subject, showButton, topic }) {
    //@@viewOn:render
    const contextData = useContext(SubmanMainContext);

    function handleDelete() {
      onDelete(topic);
    }

    function isAdministrator() {
      const isAdministration = contextData?.data?.authorizedProfileList?.some(
        (profile) => profile === Config.Profiles.ADMINISTRATIONS
      );
      const isAuthority = contextData?.data?.authorizedProfileList?.some(
        (profile) => profile === Config.Profiles.AUTHORITIES
      );
      return isAuthority || isAdministration;
    }

    return (
      <UU5.Bricks.Container>
        <UU5.Forms.ContextModal size="l" shown={true}>
          <UU5.Forms.ContextHeader
            content={<UU5.Bricks.Lsi lsi={{ en: "Edit topic", cs: "Upravit téma" }} />}
            info={<UU5.Bricks.Lsi lsi={{ cs: <UU5.Bricks.Paragraph style="margin: 0" />, en: "More info..." }} />}
          />
          <>
            {isAdministrator() && (
              <UU5.Bricks.Button size="s" onClick={handleDelete} bgStyle="transparent">
                <UU5.Bricks.Icon icon="glyphicon-trash" />
              </UU5.Bricks.Button>
            )}
          </>

          <FormUpdateTopic onSave={onSave} onCancel={onCancel} subject={subject} topic={topic} />

          <UU5.Forms.ContextControls
            buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={{ en: "Edit", cs: "Upravit" }} /> }}
            buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={{ en: "Cancel", cs: "Zrušit" }} /> }}
          />
        </UU5.Forms.ContextModal>
      </UU5.Bricks.Container>
    );
    //@@viewOff:render
  },
});

export default SubjectUpdateFormTopic;