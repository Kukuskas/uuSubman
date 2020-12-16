// //@@viewOn:imports
// import UU5 from "uu5g04";
// import { createVisualComponent } from "uu5g04-hooks";
// import Config from "./config/config";
// import SubjectDetail from "../bricks/subject-detail";
// //@@viewOff:imports

// const Subject = createVisualComponent({
//   //@@viewOn:statics
//   displayName: Config.TAG + "Subject",
//   //@@viewOff:statics

//   //@@viewOn:propTypes
//   propTypes: {
//     subjectId: UU5.PropTypes.string,
//   },
//   //@@viewOff:propTypes

//   //@@viewOn:defaultProps
//   defaultProps: {
//     subjectId: null
//   },
//   //@@viewOff:defaultProps

//   render({ subjectId }) {

//     //@@viewOn:render
//     function renderLoad() {
//       return <UU5.Bricks.Loading />;
//     }

//     return (
//       <UU5.Bricks.Container>
//         <SubjectDetail subjectId={subjectId} />
//           {({ viewState, asyncData, errorState }) => {

//             switch (viewState) {
//               case "load":
//                 return renderLoad();
//               case "error":
//                 return renderError(asyncData, errorState);
//               default:
//                 return renderReady(asyncData);
//             }
//           }}
//       </UU5.Bricks.Container>
//     );
//     //@@viewOff:render
//   }
// });

// export default Subject;
