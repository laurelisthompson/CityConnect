import { africa } from './continents/africa-cities.js';
import { asia } from './continents/asia-cities.js';
import { europe } from './continents/europe-cities.js';
import { northAmerica } from './continents/north_america-cities.js';
import { oceania } from './continents/oceania-cities.js';
import { southAmerica } from './continents/south_america-cities.js';

export const dataCities = {
    name: "global",
    children: [
        {
            name: "Africa",
            children: africa
        },
        {
            name: "Asia",
            children: asia
        },
        {
            name: "Europe",
            children: europe
        },
        {
            name: "North America",
            children: northAmerica
        },
        {
            name: "Oceania",
            children: oceania
        },
        {
            name: "South America",
            children: southAmerica
        },
    ]
};