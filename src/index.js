import "./styles/index.scss";
import graphicMap from './scripts/map';

window.addEventListener("DOMContentLoaded", () => {
    //display d3 mapping
    let mapping = document.querySelector("#d3map").appendChild(graphicMap());

    //open and close modal when about is clicked
    let openModal = document.getElementById('open-modal');
    let modalContainer = document.getElementById('modal-container');
    let closeModal = document.getElementById('close-modal');
    
    openModal.addEventListener('click', function() {
        modalContainer.style.display = 'block';
    });
    closeModal.addEventListener('click', function() {
        modalContainer.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modalContainer) {
            modalContainer.style.display = 'none';
        }
    });
});
