import Config from "./config/config";

const main = () => Config.Css.css`
    padding: 0 5%;
    padding-top:1%;
    padding-bottom:2%;
    margin: 0;    
`;
const topic = () => Config.Css.css`
 font-size: large;
 font-weight: bold;
`;
export default {
    main,
    topic
  };