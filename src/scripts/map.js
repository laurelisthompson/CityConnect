import * as d3 from 'd3';
import dataObj from './data'

export default graphicMap => {

    //define constants
    const root = pack(dataObj);
    let focus = root; //keep track of which circle the chart is focused on
    let view;

    const svg = d3.create("svg");
    svg.attr("viewBox", [0, 0, width, height]);
    //add additional styling
    svg.on("click", (event) => zoom(event, root));

    const node = svg.append("g");
    node.selectAll("circle");
    node.data(root.descendants().slice(1)); //get all node children, exclude itself
    node.join("circle");
    //add additional styling
    node.on("click", (event, node) => {
        if (focus !== node) {
            zoom(event, node);
            event.stopPropogation();
        };
    });

    const textLabel = svg.append("g");
    textLabel.selectAll("text");
    textLabel.data(root.descendants());
    textLabel.join("text");


    //define functions
    zoom = (event, node) => {
        const oldFocus = focus;
        focus = node;

        //create zoom transition constant, set duration and call tween
        const zoomTransition = svg.transition();
        zoomTransition.duration(750);
        zoomTransition.tween("zoom", node => {
            //create interpolator for the two views
            const interpolator = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            
            //t is the % of duration that has elapsed since the click
            return t => zoomTo(interpolator(t));
        });
    };

    zoomTo([root.x, root.y, root.r * 2]);

    zoomTo = (v) => { //takes in a view 
        //find proportion of the width to the diameter
        const proportion = width / v[2]
        view = v

        //transform/translate labels and nodes
        //update nodes radius
    }
};

pack = (dataObj) => {
    //creates new pack layout and sets size and padding values
    const packInstance = d3.pack();
    packInstance.size([width, height]);
    packInstance.padding(5);

    //create root node by passing into d3 hierarchy, calculating value and sorting by nodes values
    const rootNode = d3.heirarchy(dataObj); 
    rootNode.sum(d => d.value);
    rootNode.sort((a, b) => b.value - a.value);

    packInstance(rootNode);
};

const width = 900;
const height = 900;