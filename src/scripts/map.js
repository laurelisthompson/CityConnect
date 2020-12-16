import * as d3 from 'd3';
import {dataObj} from './data.js';

export default graphicMap => {

	//define constants
	const root = pack(dataObj);
	let focus = root; //keep track of which circle the chart is focused on
	let view;

	// find color depending on node 
		//background color is rbg(165, 203, 242)
		//if depth is 1, continent, return rgb(93, 161, 224)
		//if depth is 2, country, return rgb(14, 109, 204)
		//if depth is 3, experience, return rgb(247, 247, 247)

	let svg = d3.create("svg");
	svg = svg.attr("viewBox", [-450, -400, 900, 900]);
	svg = svg.on("click", (event) => zoom(event, root));
	svg.style("display", "block");
	svg.style("margin", "0 -16px");
	svg.style("background-color", "rgb(165, 203, 242)");

	let node = svg.append("g");
	node = node.selectAll("circle");
	node = node.data(root.descendants().slice(1)); //get all node children, exclude itself
	node = node.join("circle");
	node = node.on("click", (event, node) => {
		if (focus !== node) {
			zoom(event, node);
			event.stopPropogation();
		};
	});
	node.attr("fill", nd => {
		// debugger
		if (!nd.children) return "white";
		else if (nd.depth === 1) return "rgb(93, 161, 224)";
		else return "rgb(14, 109, 204)";
	})
	//additional styling to nodes

	let textLabel = svg.append("g");
	textLabel = textLabel.selectAll("text");
	textLabel = textLabel.data(root.descendants());
	textLabel = textLabel.join("text");
	textLabel = textLabel.style("fill-opacity", node => {
		node.parent === root ? 1 : 0
	});
	//add additional styling to labels

	//define functions
	const zoomTo = (v) => { //takes in a view 
		//find proportion of the width to the diameter
		const prop = width / v[2];
		view = v; 
		
		//transform/translate labels and nodes
		//debugger
		node.attr("transform", nd => {
			let xDif = nd.x - v[0];
			let yDif = nd.y - v[1];
			let xTr = xDif * prop;
			let yTr = yDif * prop;
			return `translate(${xTr}, ${yTr})`;
		});
		textLabel.attr("transform", nd => {
			let xDif = nd.x - v[0];
			let yDif = nd.y - v[1];
			let xTr = xDif * prop;
			let yTr = yDif * prop;
			return `translate(${xTr}, ${yTr})`;
		});
		//update nodes radius
		node.attr("r", nd => {
			return nd.r * prop;
		});
	};
	zoomTo([root.x, root.y, root.r * 2]);
	
	const zoom = (event, node) => {
		const oldFocus = focus;
		focus = node;

		//create zoom transition constant, set duration and call tween
		const zoomTransition = svg.transition();
		zoomTransition.duration(750);
		zoomTransition.tween("zoom", node => {
			//create interpolator for the two views
			//t is the % of duration that has elapsed since the click
			const interpolator = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
			return t => zoomTo(interpolator(t));
		});

		//TO DO filter/transition labels
	};

	return svg.node();
};

const pack = (dataObj) => {
	//creates new pack layout and sets size and padding values
	const packInstance = d3.pack();
	packInstance.size([width, height]);
	packInstance.padding(5);

	//create root node by passing into d3 hierarchy, calculating value and sorting by nodes values
	const rootNode = d3.hierarchy(dataObj); 
	rootNode.sum(node => node.value);
	rootNode.sort((a, b) => b.value - a.value);

	return packInstance(rootNode);
};

//width and height of svg
const width = 900;
const height = 900;