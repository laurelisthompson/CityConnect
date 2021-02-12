import * as d3 from 'd3';
import {dataCities} from './data-cities.js';

export default citiesPopulationMapping => {

	//define constants
	const root = pack(dataCities);
	let focus = root; //keep track of which circle the chart is focused on
	let currentView;

	// find color depending on node 
		//background color is rbg(165, 203, 242)
		//if depth is 1, continent, return rgb(93, 161, 224)
		//if depth is 2, country, return rgb(14, 109, 204)
		//if depth is 3, experience, return rgb(247, 247, 247)

	let svg = d3.create("svg");
	svg = svg.attr("viewBox", [`-400 -400 800 800`]);
	// svg = svg.attr("viewBox", [`-315 -315 650 650`]);
	svg = svg.attr("class", "svg-content");
	svg = svg.on("click", (event) => zoom(event, root));

	let node = svg.append("g");
	node = node.selectAll("circle");
	node = node.data(root.descendants().slice(1)); //get all node children, exclude itself
	node = node.join("circle");
	node.attr("fill", nd => {
		if (!nd.children) return "white";
		else if (nd.depth === 1) return "rgb(93, 161, 224)";
		else return "rgb(14, 109, 204)";
	});
	node = node.style("cursor", "pointer");
	node = node.on("mouseover", function() { 
		d3.select(this).attr("stroke", "rgb(224, 93, 161)");
		d3.select(this).attr("stroke-width", "1.5px"); 
	});
	node = node.on("mouseout", function() { 
		d3.select(this).attr("stroke", null); 
	});
	node.on("click", (event, nd) => {
		if (focus !== nd) {
			zoom(event, nd);
			event.stopPropagation();
		};
	});
	

	let textLabel = svg.append("g");
	textLabel = textLabel.selectAll("text");
	textLabel = textLabel.data(root.descendants());
	textLabel = textLabel.join("text");
	textLabel = textLabel.attr("class", "mapping-text");
	textLabel = textLabel.text(node => node.data.name);
	textLabel = textLabel.style("display", node => node.parent === root ? "inline" : "none");
	textLabel = textLabel.style("font", "16px sans-serif");
	textLabel = textLabel.style("font-family", "Montserrat");

	let expBio = svg.append("g");
	expBio = expBio.selectAll("text");
	expBio = expBio.data(root.descendants());
	expBio = expBio.join("text");
	expBio = expBio.text(node => node.data.population);
	expBio = expBio.style("display", node => node.parent === root ? "inline" : "none");
	expBio = expBio.style("font", "16px sans-serif");
	expBio = expBio.style("font-family", "Montserrat");

	// let v = [focus.x, focus.y, focus.r * 2];
	const zoomTo = (v) => { //takes in a view 
		//find proportion of the height to the diameter
		const prop = 650 / v[2];
		currentView = v; 
		
		//transform/translate labels and node
		node.attr("transform", nd => {
			let xDif = nd.x - currentView[0];
			let yDif = nd.y - currentView[1];
			let xTr = xDif * prop;
			let yTr = yDif * prop;
			return `translate(${xTr}, ${yTr})`;
		});

		textLabel.attr("transform", nd => {
				let xDif = nd.x - currentView[0];
				let yDif = nd.y - currentView[1];
				let xTr = xDif * prop;
				let yTr = yDif * prop;
				return `translate(${xTr}, ${yTr})`;
			})
		.style("fill", node => node.parent === focus ? "rgb(224, 93, 161)" : null)
		.attr("text-anchor", "middle");

		expBio.attr("transform", nd => {
			let xDif = nd.x - currentView[0];
			let yDif = nd.y - currentView[1];
			let xTr = xDif * prop;
			let yTr = yDif * prop;
			return `translate(${xTr}, ${yTr})`;
		})
		.style("fill", node => node.parent === focus ? "rgb(224, 93, 161)" : null)
		.attr("text-anchor", "middle");

		node.attr("r", nd => {
			return nd.r * prop;
		});
	};
	
	zoomTo([root.x, root.y, root.r * 2]);
	
	const zoom = (event, nd) => {
		const oldFocus = focus;
		focus = nd;

		// const zooming = function(){
		// 	//create interpolator for the two views
		// 	//t is the % of duration that has elapsed since the click
		// 	const interpolator = d3.interpolateZoom(currentView, [this.x, this.y, this.r * 2]);
		// 	return t => zoomTo(interpolator(t));
		// };

		//create zoom transition constant, set duration and call tween
		let zoomTransition = svg.transition();
		zoomTransition = zoomTransition.duration(700);
		zoomTransition = zoomTransition.tween("zoom", nd => {
			const interpolator = d3.interpolateZoom(currentView, [focus.x, focus.y, focus.r * 2]);
			return t => zoomTo(interpolator(t));
		});

		//TO DO filter/transition labels 
		textLabel.filter(function (node) { return node.parent === focus || this.style.display === "inline"; })
		.transition(zoomTransition)
		.style("fill-opacity", node => node.parent === focus ? 1 : 0)
		.on("start", function (node) { 
			if (node.parent === focus) this.style.display = "inline"; 
		})
		.on("end", function (node) { 
			if (node.parent !== focus) this.style.display = "none"; 
		});

		expBio.filter(function (node) { return node === focus || this.style.display === "inline"; })
		.transition(zoomTransition)
		.style("fill-opacity", node => node === focus ? 1 : 0)
		.on("start", function (node) {
			if (node === focus) this.style.display = "inline";
		})
		.on("end", function (node) {
			if (node !== focus) this.style.display = "none";
		});
	};

	return svg.node();
};

//width and height of svg
const width = 800;
const height = 800;

const pack = (dataCities) => {
	//creates new pack layout and sets size and padding values
	const packInstance = d3.pack();
	packInstance.size([width, height]);
	packInstance.padding(3);

	//create root node by passing into d3 hierarchy, calculating value and sorting by nodes values
	const rootNode = d3.hierarchy(dataCities); 
	rootNode.sum(node => node.population);
	rootNode.sort((a, b) => b.population - a.population);

	return packInstance(rootNode);
};