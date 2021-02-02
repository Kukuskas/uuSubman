import Config from "./config/config";

const main = () => Config.Css.css`
    padding: 0 5%;
    padding-top:1%;
    padding-bottom:2%;
    margin: 0;    
`;
const detail = () => Config.Css.css`
position: relative;
`;
const update = () => Config.Css.css`
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 18px;
`;
const updateTopic = () => Config.Css.css`
  top:-20px;
  float:right;
  box-sizing:border-box;
`;
const trash = () => Config.Css.css`
  position: absolute;
  top: 8px;
  right: 60px;
  font-size: 18px;
`;
const topic = () => Config.Css.css` 
 font-size: large;
 font-weight: bold;
`;
const cursor = () => Config.Css.css`
cursor: pointer;
`;
const accordion = () => Config.Css.css`
background-color: rgb(250, 250, 250);
`;
const visibility = () => Config.Css.css`
display:none;
`;
const buttons = () =>Config.Css.css`
left: 95px;
bottom: 26px; 
`;


export default {
  main,
  topic,
  cursor,
  detail,
  update,
  trash,
  accordion,
  updateTopic,
  visibility,
  buttons
};
