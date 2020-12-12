//@@viewOn:imports
import { createVisualComponent} from "uu5g04-hooks";
import Config from "./config/config";
import SubjectList from "../bricks/subject-list";
import SubjectProvider from "../bricks/subject-provider";
import SubjectCreate from "../bricks/subject-create";
<<<<<<< HEAD
import SubjectsTitle from "../bricks/subjects-title";
=======
import SubjectsTitle from "../bricks/subject-title";
>>>>>>> 57b05dfcd69ad21acaa2964dde1ef27ecb452184
//@@viewOff:imports

const Subjects = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Subjects",
  //@@viewOff:statics

<<<<<<< HEAD
  //@@viewOn:render
render() {
 //@@viewOn:render
return (
  <UU5.Bricks.Container>
    <SubjectProvider>
      {({ viewState, subjects, handleCreate, handleDelete }) => {
        return (
          <>
            <SubjectsTitle subjects={subjects} />
            <SubjectCreate onCreate={handleCreate} />
            <SubjectList subjects={subjects} onDelete={handleDelete} />
          </>
        );
      }}
    </SubjectProvider>
  </UU5.Bricks.Container>
);
//@@viewOff:render
=======
//@@viewOn:render
render() {
  //@@viewOn:render
  return (
    <UU5.Bricks.Container>
      <SubjectProvider>
        {({ viewState, subjects, handleCreate, handleDelete }) => {
          return (
            <>
              <SubjectsTitle subjects={subjects} />
              <SubjectCreate onCreate={handleCreate} />
              <SubjectList subjects={subjects} onDelete={handleDelete} />
            </>
          );
        }}
      </SubjectProvider>
    </UU5.Bricks.Container>
  );
  //@@viewOff:render
>>>>>>> 57b05dfcd69ad21acaa2964dde1ef27ecb452184
}
//@@viewOff:render
});

export default Subjects;