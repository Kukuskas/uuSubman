//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./config/lsi";
import "uu5g04-bricks";
import "uu5g04-block-layout";
import "uu5g04-forms";
import Css from "../routes/detail.css";
import TeacherList from "./teacher-list";

//@@viewOff:imports

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



  render({ name, subject, colorSchema, onDelete, onUpdate }) {

    //@@viewOn:private
    function handleDelete() {
      onDelete(subject);
    }
    function handleUpdate() {
      onUpdate(subject);
    }
    function handleGet() {
      onGet(subject);
    }
    function handleSwitch() {

    }

    function handleClick() {

    }
    //@@viewOff:private

    //@@viewOn:render
    function renderHeader() {
      return (
        <>
          {<UU5.Bricks.Lsi lsi={subject.name} />}
          <UU5.Bricks.Button onClick={handleDelete} colorSchema="grey">
            <UU5.Bricks.Icon icon="mdi-delete" />
          </UU5.Bricks.Button>
        </>
      );
    }


    return (

      <UU5.Bricks.Section >
        <UU5.Bricks.Box colorSchema="green">
          <UU5.Bricks.Header className="uu5-common-center"
            level={1}>

            {<UU5.Bricks.Lsi lsi={subject.name} />}</UU5.Bricks.Header>
        </UU5.Bricks.Box>


        <UU5.Bricks.Row>
          <UU5.Bricks.Column colWidth="s-4">
            <UU5.BlockLayout.Tile borderRadius="8px" margin="5px">
              <UU5.Bricks.Icon icon="uubml-diploma" />
              {<UU5.Bricks.Lsi lsi={Lsi.subjectCredits} />}
              {subject.credits}

            </UU5.BlockLayout.Tile>


            <div onClick={handleClick}>
              <UU5.BlockLayout.Tile borderRadius="8px" margin="5px">
                <UU5.Bricks.Icon icon="uubml-officer-junior-man" />
                {<UU5.Bricks.Lsi lsi={{ en: "Teachers", cs: "Učitelé" }} />}
              </UU5.BlockLayout.Tile>
            </div>
          </UU5.Bricks.Column>


          <UU5.Bricks.Column colWidth="s-4" >
            <UU5.BlockLayout.Tile borderRadius="8px" margin="5px">
              <UU5.Bricks.Icon icon="uubml-idea" />
              {<UU5.Bricks.Lsi lsi={Lsi.subjectLanguage} />}
              {Object.keys(subject.language).join(" / ")}
            </UU5.BlockLayout.Tile>

            {/*                   
             <div onClick={handleSwitch}> */}
            <UU5.BlockLayout.Tile borderRadius="8px" margin="5px">
              {<UU5.Bricks.Lsi lsi={Lsi.subjectChangeForm} />}
            </UU5.BlockLayout.Tile>
            {/* </div>   */}
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


        <TeacherList teachers={subject.teachers} />


        <UU5.Bricks.Box >
          <UU5.Bricks.Block
            content={<UU5.Bricks.Lsi lsi={subject.desc} />} colorSchema="green" />
        </UU5.Bricks.Box>
      </UU5.Bricks.Section>

    );
  },
  //@@viewOff:render
});

export default SubjectDetail;
