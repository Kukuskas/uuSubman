//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Subject from "./subject";
import Uu5Tiles from "uu5tilesg02";
//@@viewOff:imports

const SubjectList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subjects: UU5.PropTypes.array.isRequired,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subjects: [],
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {}
  },
  //@@viewOff:defaultProps

  render({ subjects, onDetail, onUpdate, onDelete }) {
    //@@viewOn:render
    function renderItem(item) {console.log(item.data);console.log(item);
        return (
            <Subject subject={item.data} colorSchema="green" onDetail={onDetail} onUpdate={onUpdate} onDelete={onDelete} />
        );
      }
      
      
    
    if (subjects.length === 0) {
      return <UU5.Common.Error content="WTF No subjects!" />;
    }

    return (
        <Uu5Tiles.Grid
      data={subjects}
      tileHeight="auto"
      tileMinWidth={200}
      tileMaxWidth={400}
      tileMinHeight={80}
      tileSpacing={8}
      rowSpacing={8}
    >
        {renderItem}
    </Uu5Tiles.Grid>

      );
    //@@viewOff:render
  }
});

export default SubjectList;

// //@@viewOn:imports
// import UU5 from "uu5g04";
// import { createVisualComponent } from "uu5g04-hooks";
// import Config from "./config/config";
// import Subject from "./subject";
// //@@viewOff:imports

// const SubjectList = createVisualComponent({
//   //@@viewOn:statics
//   displayName: Config.TAG + "SubjectList",
//   //@@viewOff:statics

//   //@@viewOn:propTypes
//   propTypes: {
//     subjects: UU5.PropTypes.array.isRequired,
//     onDetail: UU5.PropTypes.func,
//     onUpdate: UU5.PropTypes.func,
//     onDelete: UU5.PropTypes.func
//   },
//   //@@viewOff:propTypes

//   //@@viewOn:defaultProps
//   defaultProps: {
//     subjects: [],
//     onDetail: () => {},
//     onUpdate: () => {},
//     onDelete: () => {}
//   },
//   //@@viewOff:defaultProps

//   render({ subjects, onDetail, onUpdate, onDelete }) {
//     //@@viewOn:render
//     if (subjects.length === 0) {
//       return <UU5.Common.Error content="WTF No subjects!" />;
//     }

//     return (
//         <UU5.Bricks.Row>
//           {subjects.map(subject => (
//             <UU5.Bricks.Column key={subject.id} colWidth="xs-12 m-6 l-4 xl-3">
//               <Subject subject={subject} colorSchema="green" onDetail={onDetail} onUpdate={onUpdate} onDelete={onDelete} />
//             </UU5.Bricks.Column>
//           ))}
//           <Subject />
//         </UU5.Bricks.Row>
//       );
//     //@@viewOff:render
//   }
// });

// export default SubjectList;