import Config from "../config/config"; 

const card = () => Config.Css.css`
    height: 80%; 
    display: flex;
    flex-direction: column; 
    background-color: white; 
    padding: 2em;  
    border: 2px solid #F44336; 
    border-radius: 2em; 
    color: #212121;
`;

const headerCard = () => Config.Css.css`
    background-color: #F44336;
    font-size: 18px;
    color: white; 
    margin:0; 
    padding: 3em; 
`;

const descCard = () => Config.Css.css`
    font-size: 15px;
    margin-top: 2.5em; 
    margin-left: 0.5em; 
    color: rgba(0,0,0,0.54); 
    float: left; 
    padding-bottom: 1em; 
`;

const labelCard = () => Config.Css.css`
    width: 2em; 
    margin-top: -3em;  
    background-color: grey; 
`;

const footerCard = () => Config.Css.css`
   margin-left: 5em; 
   color: #F44336;
`;

export default {
    card, 
    headerCard, 
    descCard, 
    labelCard,
    footerCard
}

