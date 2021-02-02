//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useContext, useSession } from "uu5g04-hooks";
import Config from "./config/config";
import Subject from "./subject";
import Uu5Tiles from "uu5tilesg02";
import SubjectCreate from "./subject-create";
import SubmanMainContext from "../bricks/subman-main-context";
//@@viewOff:imports

const SubjectList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subjects: UU5.PropTypes.array.isRequired,
    showButton: UU5.PropTypes.bool,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
    onCreate: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subjects: [],
    showButton: false,
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
    onCreate: () => {},
  },
  //@@viewOff:defaultProps

  render({ showButton, subjects, onCreate, onDetail, onUpdate, onDelete }) {
    //@@viewOn:hooks
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { identity } = useSession();
    const contextData = useContext(SubmanMainContext);

    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    const isAuthority = contextData?.data?.authorizedProfileList?.some(
      (profile) => profile === Config.Profiles.AUTHORITIES
    );
    const isAdministration = contextData?.data?.authorizedProfileList?.some(
      (profile) => profile === Config.Profiles.ADMINISTRATIONS
    );
    function canManage() {
      return isAuthority || isAdministration;
    }

    function visibility() {
      if (!isAuthority || !isAdministration) {
        subjects.map((data, index) => {
          let isGarant = false;
          let isTeacher = false;
          if (identity !== null && identity !== undefined) {
            isGarant = data.data.supervisor === identity.uuIdentity;
            isTeacher = data.data.teachers.some((teacher) => teacher === identity.uuIdentity);
          }
          // console.log(
          //   "God mode: ", isAuthority,
          //   "Is administraton: ", isAdministration?true:false,
          //   "Is teacher: ", isTeacher || isGarant);
          if (!isGarant && !isTeacher && data.data.visibility == false) {
            subjects.splice(index, 1);
          }
        });
      }
      return subjects;
    }

    //@@viewOn:interface
    function renderItem(item) {
      return (
        <Subject
          subject={item.data.data}
          colorSchema="green"
          onDetail={onDetail}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      );
    }
    //@@viewOn:interface

    //@@viewOn:handlers
    function handleOpenCreateSubjectForm() {
      setShowCreateModal(true);
    }

    function handleCloseCreateSubjectForm() {
      setShowCreateModal(false);
    }

    function handleCreateSubjectSave(opt) {
      let it = opt.values;
      const input = {
        name: {
          cs: it.nameCs,
          en: it.nameEn,
        },
        credits: parseInt(it.credits),
        supervisor: it.supervisor,
        degree: it.degree,
        desc: {
          cs: it.descCs,
          en: it.descEn,
        },
        languageOfStudy: it.languageOfStudy,
        language: {},
        teachers: it.teachers.split(","),
        visibility: false,
      };
      if (/^[0-9]{1,4}-[0-9]{1,4}(-[0-9]{1,4}(-[0-9]{1,4})?)?$/g.test(it.supervisor)) {
        onCreate(input);
      } else {
        return alert("fill in supervisor correctly");
      }
      setShowCreateModal(false);
    }
    //@@viewOff:handlers

    //@@viewOn:render

    const GET_ACTIONS = ({ screenSize }) => {
      return [
        {
          content: {
            en: "Add subject",
          },

          onClick: handleOpenCreateSubjectForm,
          icon: "mdi-plus-circle",
          colorSchema: "primary",
          bgStyle: "filled",
          active: true,
        },
      ];
    };

    if (subjects.length === 0) {
      return (
        <>
          {console.log(isAuthority)}
          <Uu5Tiles.ControllerProvider data={subjects}>
            <Uu5Tiles.ActionBar actions={canManage() && showButton ? GET_ACTIONS : []} />
          </Uu5Tiles.ControllerProvider>
          <SubjectCreate
            shown={showCreateModal}
            onSave={handleCreateSubjectSave}
            onCancel={handleCloseCreateSubjectForm}
          />
          <UU5.Common.Error content="WTF No subjects!" />
        </>
      );
    }

    return (
      <>
        <SubjectCreate
          shown={showCreateModal}
          onSave={handleCreateSubjectSave}
          onCancel={handleCloseCreateSubjectForm}
        />
        {visibility() && (
          <Uu5Tiles.ControllerProvider data={subjects}>
            <Uu5Tiles.ActionBar actions={canManage() && showButton ? GET_ACTIONS : []} />
            <Uu5Tiles.Grid tileHeight="auto" tileMinWidth={200} tileMaxWidth={300} tileSpacing={8} rowSpacing={8}>
              {renderItem}
            </Uu5Tiles.Grid>
          </Uu5Tiles.ControllerProvider>
        )}
      </>
    );
    //@@viewOff:render
  },
});

export default SubjectList;
