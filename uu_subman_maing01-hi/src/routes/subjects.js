//@@viewOn:imports
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import SubjectList from "../bricks/subject-list";
import SubjectProvider from "../bricks/subject-provider";
import SubjectCreate from "../bricks/subject-create";
import SubjectsTitle from "../bricks/subject-title";
//@@viewOff:imports

const Subjects = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Subjects",
  //@@viewOff:statics

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
}
//@@viewOff:render
});

export default Subjects;