import Config from "./config/config";

const detail = () => Config.Css.css`
position: relative;
`;
const update = () => Config.Css.css`
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 18px;
`;
const trash = () => Config.Css.css`
  position: absolute;
  top: 8px;
  right: 60px;
  font-size: 18px;
`;
const cursor =() => Config.Css.css`
cursor: pointer;
`;
export default {
    detail,
    update,
    cursor,
    trash
  };