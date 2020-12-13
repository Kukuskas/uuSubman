//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:impor<<<<
let initialSubjects = [
    {
        name: {
          cs: "Fyzika",
          en: "Physic"
        },
        "credits": 3,
        "supervisor": "121-25-256",
        "degree": "Bachalor",
        "desc": {
          "cs": "Cíl předemětu je...",
          "en": "Goal of this subject..."
        },
        "language": "cs",
        "visibility": false,
        "uuIdentity": "25-1622-1",
        "awid": "22222222222222222222222222222222",
        "sys": {
          "cts": "2020-12-12T13:01:46.531Z",
          "mts": "2020-12-12T13:01:46.531Z",
          "rev": 0
        },
        "id": "5fd4bf3j060269828c1be824",
        "uuAppErrorMap": {}
      },
      {
        "name": {
          "cs": "Matematika",
          "en": "Mathematic"
        },
        "credits": 3,
        "supervisor": "121-25-256",
        "degree": "Bachalor",
        "desc": {
          "cs": "Cíl předemětu je...",
          "en": "Goal of this subject..."
        },
        "language": "cs",
        "visibility": false,
        "uuIdentity": "25-1622-1",
        "awid": "22222222222222222222222222222222",
        "sys": {
          "cts": "2020-12-12T13:01:46.531Z",
          "mts": "2020-12-12T13:01:46.531Z",
          "rev": 0
        },
        "id": "5fd4bf3d060269828c1be824",
        "uuAppErrorMap": {}
      },
      {
        "name": {
          "cs": "Angličtina",
          "en": "English"
        },
        "credits": 3,
        "supervisor": "121-25-256",
        "degree": "Bachalor",
        "desc": {
          "cs": "Cíl předemětu je...",
          "en": "Goal of this subject..."
        },
        "language": "cs",
        "visibility": false,
        "uuIdentity": "25-1622-1",
        "awid": "22222222222222222222222222222222",
        "sys": {
          "cts": "2020-12-12T13:01:46.531Z",
          "mts": "2020-12-12T13:01:46.531Z",
          "rev": 0
        },
        "id": "5fd4bf3c060269828c1be824",
        "uuAppErrorMap": {}
      },
      {
        "name": {
          "cs": "Kung-fu",
          "en": "Kung-fu"
        },
        "credits": 3,
        "supervisor": "121-25-256",
        "degree": "Bachalor",
        "desc": {
          "cs": "Cíl předemětu je...",
          "en": "Goal of this subject..."
        },
        "language": "cs",
        "visibility": false,
        "uuIdentity": "25-1622-1",
        "awid": "22222222222222222222222222222222",
        "sys": {
          "cts": "2020-12-12T13:01:46.531Z",
          "mts": "2020-12-12T13:01:46.531Z",
          "rev": 0
        },
        "id": "5fd4bf3b060269828c1be824",
        "uuAppErrorMap": {}
      },
      {
        "name": {
          "cs": "Programování",
          "en": "Programming"
        },
        "credits": 3,
        "supervisor": "121-25-256",
        "degree": "Bachalor",
        "desc": {
          "cs": "Cíl předemětu je...",
          "en": "Goal of this subject..."
        },
        "language": "cs",
        "visibility": false,
        "uuIdentity": "25-1622-1",
        "awid": "22222222222222222222222222222222",
        "sys": {
          "cts": "2020-12-12T13:01:46.531Z",
          "mts": "2020-12-12T13:01:46.531Z",
          "rev": 0
        },
        "id": "5fd4bf3a060269828c1be824",
        "uuAppErrorMap": {}
      },
      {
        name: {
          cs: "Fyzika 2",
          en: "Physic 2"
        },
        "credits": 3,
        "supervisor": "121-25-256",
        "degree": "Bachalor",
        "desc": {
          "cs": "Cíl předemětu je...",
          "en": "Goal of this subject..."
        },
        "language": "cs",
        "visibility": false,
        "uuIdentity": "25-1622-1",
        "awid": "22222222222222222222222222222222",
        "sys": {
          "cts": "2020-12-12T13:01:46.531Z",
          "mts": "2020-12-12T13:01:46.531Z",
          "rev": 0
        },
        "id": "1fd4bf3j060269828c1be824",
        "uuAppErrorMap": {}
      },
      {
        "name": {
          "cs": "Matematika 2",
          "en": "Mathematic 2"
        },
        "credits": 3,
        "supervisor": "121-25-256",
        "degree": "Bachalor",
        "desc": {
          "cs": "Cíl předemětu je...",
          "en": "Goal of this subject..."
        },
        "language": "cs",
        "visibility": false,
        "uuIdentity": "25-1622-1",
        "awid": "22222222222222222222222222222222",
        "sys": {
          "cts": "2020-12-12T13:01:46.531Z",
          "mts": "2020-12-12T13:01:46.531Z",
          "rev": 0
        },
        "id": "2fd4bf3d060269828c1be824",
        "uuAppErrorMap": {}
      },
      {
        "name": {
          "cs": "Angličtina 2",
          "en": "English 2"
        },
        "credits": 3,
        "supervisor": "121-25-256",
        "degree": "Bachalor",
        "desc": {
          "cs": "Cíl předemětu je...",
          "en": "Goal of this subject..."
        },
        "language": "cs",
        "visibility": false,
        "uuIdentity": "25-1622-1",
        "awid": "22222222222222222222222222222222",
        "sys": {
          "cts": "2020-12-12T13:01:46.531Z",
          "mts": "2020-12-12T13:01:46.531Z",
          "rev": 0
        },
        "id": "3fd4bf3c060269828c1be824",
        "uuAppErrorMap": {}
      },
      {
        "name": {
          "cs": "Kung-fu 2",
          "en": "Kung-fu 2"
        },
        "credits": 3,
        "supervisor": "121-25-256",
        "degree": "Bachalor",
        "desc": {
          "cs": "Cíl předemětu je...",
          "en": "Goal of this subject..."
        },
        "language": "cs",
        "visibility": false,
        "uuIdentity": "25-1622-1",
        "awid": "22222222222222222222222222222222",
        "sys": {
          "cts": "2020-12-12T13:01:46.531Z",
          "mts": "2020-12-12T13:01:46.531Z",
          "rev": 0
        },
        "id": "4fd4bf3b060269828c1be824",
        "uuAppErrorMap": {}
      },
      {
        "name": {
          "cs": "Programování 2",
          "en": "Programming 2"
        },
        "credits": 3,
        "supervisor": "121-25-256",
        "degree": "Bachalor",
        "desc": {
          "cs": "Cíl předemětu je...",
          "en": "Goal of this subject..."
        },
        "language": "cs",
        "visibility": false,
        "uuIdentity": "25-1622-1",
        "awid": "22222222222222222222222222222222",
        "sys": {
          "cts": "2020-12-12T13:01:46.531Z",
          "mts": "2020-12-12T13:01:46.531Z",
          "rev": 0
        },
        "id": "6fd4bf3a060269828c1be824",
        "uuAppErrorMap": {}
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
        // subject.id = UU5.Common.Tools.generateUUID();
        // subject.averageRating = Math.round(Math.random() * 5); // <0, 5>
        // setSubjects(prevSubjects => prevSubjects.concat([subject]));
      }

      function handleDelete(subject) {
        setSubjects(prevSubjects => prevSubjects.filter(item => item.id !== subject.id));
      }
      function handleDetail(subject) {
        console.log( "Detail předmětu: " + subject.name.cs); //Here fill in Subject/detail function 
        ;
      }

    //@@viewOff:private

    //@@viewOn:render
    return children({ subjects, handleCreate, handleDelete, handleDetail });
    //@@viewOff:render
  }
});

export default SubjectProvider;