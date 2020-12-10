import africa from './continents/africa'
import antartica from './continents/antartica'
import asia from './continents/asia'
import europe from './continents/europe'
import northAmerica from './continents/north_america'
import oceania from './continents/oceania'
import southAmerica from './continents/south_america'

export default dataObj = {
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