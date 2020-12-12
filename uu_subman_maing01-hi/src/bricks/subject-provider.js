//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

let initialSubjects = [
  {
    id: 1,
    name: "Subject 1",
    text: "This is my subject 1...",
    averageRating: 5.0
  },
  {
    id: 2,
    name: "Subject 2",
    text: "This is my subject 2...",
    averageRating: 4.0
  },
  {
    id: 3,
    name: "Subject 3",
    text: "This is my subject 3...",
    averageRating: 3.0
  },
  {
    id: 4,
    name: "Subject 4",
    text: "This is my subject 4...",
    averageRating: 2.0
  },
  {
    id: 5,
    name: "Subject 5",
    text: "This is my subject 5...",
    averageRating: 1.0
  }
];

const SubjectProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectProvider",
  //@@viewOff:statics

  render({ children }) {
      
    const [subjects, setSubjects] = useState(initialSubjects); 
      
      //@@viewOn:private
     
      function handleCreate(subject) {
        subject.id = UU5.Common.Tools.generateUUID();
        subject.averageRating = Math.round(Math.random() * 5); // <0, 5>
        setSubjects(prevSubjects => prevSubjects.concat([subject]));
      }

      function handleDelete(subject) {
        setSubjects(prevSubjects => prevSubjects.filter(item => item.id !== subject.id));
      }

    //@@viewOff:private

    //@@viewOn:render
    return children({ subjects, handleCreate, handleDelete });
    //@@viewOff:render
  }
});

export default SubjectProvider;