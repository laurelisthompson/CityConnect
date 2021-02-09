import "./styles/index.scss";
import cityPopulationMap from './scripts/cities-mapping';
import countryAreaMap from './scripts/area-mapping';
import countryPopulationMap from './scripts/population-mapping';
import countryGDPMap from './scripts/gdp-mapping';

window.addEventListener("DOMContentLoaded", () => {
    //display d3 mapping
    let citiesPopulationMapping = document.querySelector("#citiesPopulationMapping").appendChild(cityPopulationMap());
    let countriesAreaMapping = document.querySelector("#countriesAreaMapping").appendChild(countryAreaMap());
    let countriesPopulationMapping = document.querySelector("#countriesPopulationMapping").appendChild(countryPopulationMap());
    let countriesGDPMapping = document.querySelector("#countriesGDPMapping").appendChild(countryGDPMap());

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