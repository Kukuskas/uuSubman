// //@@viewOn:imports
// import UU5 from "uu5g04";
// import "uu5g04-bricks";
// import { createVisualComponent, useState } from "uu5g04-hooks";
// import Plus4U5 from "uu_plus4u5g01";
// import "uu_plus4u5g01-app";

// import Config from "./config/config";
// import Top from "./top";
// import Left from "./left";
// import Bottom from "./bottom";
// import Home from "../routes/home";
// import Subjects from "../routes/subjects";
// import SubjectRoute from "../routes/subjectRoute";
// //@@viewOff:imports

// const STATICS = {
//   //@@viewOn:statics
//   displayName: Config.TAG + "SpaAuthenticated"
//   //@@viewOff:statics
// };

// const About = UU5.Common.Component.lazy(() => import("../routes/about"));

// const DEFAULT_USE_CASE = "home";

// const ROUTES = {
//   "": DEFAULT_USE_CASE,
//   home: { component: <Home /> },
//   about: { component: <About /> },
//   subjects: { component: <Subjects /> },
//   "sys/uuAppWorkspace/initUve": { component: <InitAppWorkspace /> },
//   "subjects/subject": { component: <SubjectRoute /> },
//   controlPanel: { component: <ControlPanel /> },
// };

// export const SpaReady = createVisualComponent({
//   ...STATICS,

//   //@@viewOn:propTypes
//   //@@viewOff:propTypes

//   //@@viewOn:defaultProps
//   //@@viewOff:defaultProps

//   render(props) {
//     //@@viewOn:private
//     let [initialActiveItemId] = useState(() => {
//       let url = UU5.Common.Url.parse(window.location.href);
//       return url.useCase || DEFAULT_USE_CASE;
//     });
//     //@@viewOff:private

//     //@@viewOn:interface
//     //@@viewOff:interface
//     console.log(...props)
//     //@@viewOn:render
//     return (
      
//       <Plus4U5.App.MenuProvider activeItemId={initialActiveItemId}>
//         <Plus4U5.App.Page
//           {...props}
//           top={<Top />}
//           topFixed="smart"
//           bottom={<Bottom />}
//           type={3}
//           displayedLanguages={["cs", "en"]}
//           left={<Left />}
//           leftWidth="!xs-300px !s-300px !m-288px !l-288px !xl-288px"
//           leftFixed
//           leftRelative="m l xl"
//           leftResizable="m l xl"
//           leftResizableMinWidth={220}
//           leftResizableMaxWidth={500}
//           isLeftOpen="m l xl"
//           showLeftToggleButton
//           fullPage
//         >
//           <Plus4U5.App.MenuConsumer>
//             {({ setActiveItemId }) => {
//               let handleRouteChanged = ({ useCase, parameters }) => setActiveItemId(useCase || DEFAULT_USE_CASE);
//               return (
//                 <UU5.Common.Router
//                   routes={ROUTES}
//                   controlled={false}
//                   onRouteChanged={handleRouteChanged}
//                   notFoundRoute="home"
//                 />
//               );
//             }}
//           </Plus4U5.App.MenuConsumer>
//         </Plus4U5.App.Page>
//       </Plus4U5.App.MenuProvider>
//     );
//     //@@viewOff:render
//   }
// });

// export default SpaReady;