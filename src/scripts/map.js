import * as d3 from 'd3';
import dataObj from './data'

export default graphicMap => {

    const root = pack(dataObj);

    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);
}

