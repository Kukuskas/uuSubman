//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
//@@viewOff:impor<<<<

const SubjectProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectProvider",
  //@@viewOff:statics

  render({ children }) {
    // const [subjects, setSubjects] = useState(initialSubjects);

    //   //@@viewOn:private

    //   function handleCreate(subject) {
    //     // subject.id = UU5.Common.Tools.generateUUID();
    //     // subject.averageRating = Math.round(Math.random() * 5); // <0, 5>
    //     // setSubjects(prevSubjects => prevSubjects.concat([subject]));
    //   }

    //   function handleDelete(subject) {
    //     setSubjects(prevSubjects => prevSubjects.filter(item => item.id !== subject.id));
    //   }
    //   function handleDetail(subject) {
    //     console.log( "Detail předmětu: " + subject.name.cs); //Here fill in Subject/detail function
    //     ;
    //   }

    //@@viewOn:hooks
    let listDataValues = useDataList({
      pageSize: 200,
      handlerMap: {
        load: Calls.listSubjects,
        createSubject: Calls.createSubject,
        updateSubject: Calls.updateSubject,
        deleteSubject: Calls.deleteSubject,
      },
    });

    let { state, data, newData, pendingData, errorData, handlerMap } = listDataValues;
    //@@viewOff:hooks

    //@@viewOff:private

    //@@viewOn:render
    return children({
      state,
      data,
      newData,
      pendingData,
      errorData,
      handlerMap,
    });
    //@@viewOff:render
  },
});

export default SubjectProvider;
