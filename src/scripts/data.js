import {africa} from './continents/africa.js';
import {antartica} from './continents/antartica.js';
import {asia} from './continents/asia.js';
import {europe} from './continents/europe.js';
import {northAmerica} from './continents/north_america.js';
import {oceania} from './continents/oceania.js';
import {southAmerica} from './continents/south_america.js';

export const dataObj = {
	name: "global",
	children: [
		{
			name: "Africa",
			children: africa
		},
		{
			name: "Antartica",
			children: antartica
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