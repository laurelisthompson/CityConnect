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
	svg = svg.attr("viewBox", [`-${width/2} -${height/2} ${width} ${height}`]);
	svg = svg.style("display", "block");
	svg = svg.style("margin", "20px 10px");
	svg = svg.style("background-color", "rgb(165, 203, 242)");
	// svg = svg.style("background-color", "red");
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
		d3.select(this).attr("stroke-width", "3px"); 
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

	// let textLabel = svg.append("g");
	// textLabel = textLabel.selectAll("text");
	// textLabel = textLabel.data(root.descendants());
	// textLabel = textLabel.join("text");
	// textLabel = textLabel.style("fill-opacity", node => {
	// 	node.parent === root ? 1 : 0
	// });
	//add additional styling to labels

	//define functions
	// let v = [focus.x, focus.y, focus.r * 2];
	const zoomTo = () => { //takes in a view 
		//find proportion of the width to the diameter
		const prop = width / focus.y;
		// debugger
		view = [focus.x, focus.y, focus.r * 2]; 
		
		//transform/translate labels and nodes
		//debugger
		node.attr("transform", nd => {
			let xDif = nd.x - view[0];
			let yDif = nd.y - view[1];
			let xTr = xDif * prop;
			let yTr = yDif * prop;
			return `translate(${xTr}, ${yTr})`;
		});
		// textLabel.attr("transform", nd => {
			// 	let xDif = nd.x - v[0];
			// 	let yDif = nd.y - v[1];
			// 	let xTr = xDif * prop;
			// 	let yTr = yDif * prop;
			// 	return `translate(${xTr}, ${yTr})`;
			// });
			//update nodes radius
			node.attr("r", nd => {
				return nd.r * prop;
			});
		};
	zoomTo([focus.x, focus.y, focus.r * 2]);
	
	const zoom = (event, nd) => {
		const oldFocus = focus;
		focus = nd;

		const zooming = function(){
			// debugger
			const interpolator = d3.interpolateZoom(view, [this.x, this.y, this.r * 2]);
			return t => zoomTo(interpolator(t));
		};

		// debugger
		//create zoom transition constant, set duration and call tween
		let zoomTransition = svg.transition();
		zoomTransition.duration(850);
		zoomTransition.tween("zoom", zooming.apply(focus));
		// zoomTransition.tween("zoom", focus => {
		// 	//create interpolator for the two views
		// 	//t is the % of duration that has elapsed since the click
		// 	debugger
		// 	const interpolator = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
		// 	return t => zoomTo(interpolator(t));
		// });

		//TO DO filter/transition labels
	};

	return svg.node();
};

//width and height of svg
const width = 1000;
const height = 500;

const pack = (dataObj) => {
	//creates new pack layout and sets size and padding values
	const packInstance = d3.pack();
	packInstance.size([width, height]);
	packInstance.padding(3);

	//create root node by passing into d3 hierarchy, calculating value and sorting by nodes values
	const rootNode = d3.hierarchy(dataObj); 
	rootNode.sum(node => node.value);
	rootNode.sort((a, b) => a.value - b.value);

	return packInstance(rootNode);
};