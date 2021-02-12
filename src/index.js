import "./styles/index.scss";
import cityPopulationMap from './scripts/cities-mapping';
import countryAreaMap from './scripts/area-mapping';
import countryPopulationMap from './scripts/population-mapping';
import countryGDPMap from './scripts/gdp-mapping';
import { svg } from "d3";

window.addEventListener("DOMContentLoaded", () => {
    //display d3 mappings with selection dropdown    
    let citiesPopulationMapping = document.querySelector("#d3leftMapping").appendChild(cityPopulationMap());
    let countriesAreaMapping = document.querySelector("#d3rightMapping").appendChild(countryAreaMap());

    let leftDropdown = document.getElementById('leftMappingDrop').addEventListener('change', function () {
        if (this.value == "cityPop") {
            if (document.querySelector("#d3leftMapping").hasChildNodes) {
                let oldMapping = document.getElementById("d3leftMapping");
                document.querySelector("#d3leftMapping").removeChild(oldMapping.firstChild);
            }
            document.querySelector("#d3leftMapping").appendChild(cityPopulationMap());
        } else if (this.value == "area") {
            if (document.querySelector("#d3leftMapping").hasChildNodes) {
                let oldMapping = document.getElementById("d3leftMapping");
                document.querySelector("#d3leftMapping").removeChild(oldMapping.firstChild);
            }
            document.querySelector("#d3leftMapping").appendChild(countryAreaMap());
        } else if (this.value == "pop") {
            if (document.querySelector("#d3leftMapping").hasChildNodes) {
                let oldMapping = document.getElementById("d3leftMapping");
                document.querySelector("#d3leftMapping").removeChild(oldMapping.firstChild);
            }
            document.querySelector("#d3leftMapping").appendChild(countryPopulationMap());
        } else if (this.value == "gdp") {
            if (document.querySelector("#d3leftMapping").hasChildNodes) {
                let oldMapping = document.getElementById("d3leftMapping");
                document.querySelector("#d3leftMapping").removeChild(oldMapping.firstChild);
            }
            document.querySelector("#d3leftMapping").appendChild(countryGDPMap());
        };
    });

    let rightDropdown = document.getElementById('rightMappingDrop').addEventListener('change', function () {
        if (this.value == "cityPop") {
            if (document.querySelector("#d3rightMapping").hasChildNodes) {
                let oldMapping = document.getElementById("d3rightMapping");
                document.querySelector("#d3rightMapping").removeChild(oldMapping.firstChild);
            }
            document.querySelector("#d3rightMapping").appendChild(cityPopulationMap());
        } else if (this.value == "area") {
            if (document.querySelector("#d3rightMapping").hasChildNodes) {
                let oldMapping = document.getElementById("d3rightMapping");
                document.querySelector("#d3rightMapping").removeChild(oldMapping.firstChild);
            }
            document.querySelector("#d3rightMapping").appendChild(countryAreaMap());
        } else if (this.value == "pop") {
            if (document.querySelector("#d3rightMapping").hasChildNodes) {
                let oldMapping = document.getElementById("d3rightMapping");
                document.querySelector("#d3rightMapping").removeChild(oldMapping.firstChild);
            }
            document.querySelector("#d3rightMapping").appendChild(countryPopulationMap());
        } else if (this.value == "gdp") {
            if (document.querySelector("#d3rightMapping").hasChildNodes) {
                let oldMapping = document.getElementById("d3rightMapping");
                document.querySelector("#d3rightMapping").removeChild(oldMapping.firstChild);
            }
            document.querySelector("#d3rightMapping").appendChild(countryGDPMap());
        };
    });

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