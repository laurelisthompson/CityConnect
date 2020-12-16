import "./styles/index.scss";
import graphicMap from './scripts/map';

window.addEventListener("DOMContentLoaded", () => {
    console.log("testing");
    
    let mapping = document.querySelector("body").appendChild(graphicMap());
    // debugger
    // graphicMap();
});