//@@viewOn:imports
import { createVisualComponent} from "uu5g04-hooks";
import Config from "./config/config";
import SubjectList from "../bricks/subject-list";
import SubjectProvider from "../bricks/subject-provider";
import SubjectCreate from "../bricks/subject-create";
import SubjectsTitle from "../bricks/subject-title";
import Css from './subject.css';
import SubjectDetail from "../bricks/subject-detail";
import UU5 from "uu5g04";
//@@viewOff:imports

const Subjects = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Subjects",
  //@@viewOff:statics

//@@viewOn:render
render() {
  //@@viewOn:render
  return (
    <UU5.Bricks.Section className={Css.main()}>
      <SubjectProvider>
        {({ viewState, subjects, handleCreate, handleDelete, handleDetail, subject }) => {
          return (
            <>
              <SubjectsTitle subjects={subjects} />
              <SubjectCreate onCreate={handleCreate} />
              <SubjectList subjects={subjects} onDelete={handleDelete} onDetail={handleDetail}/>
              <UU5.Bricks.Header detail/>
              <SubjectDetail subject={subject}/>
            </>
          );
        }}
      </SubjectProvider>
    </UU5.Bricks.Section>
  );
  //@@viewOff:render
}
//@@viewOff:render
});

export default Subjects;