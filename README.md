# Data Correlator

[Link to Data Correlator](https://laurelisthompson.github.io/data-correlator/)

It’s time to explore the world’s data! Data Correlator allows comparison and interaction with data order to gain a
deeper understanding of its impact. The data sets used compare area (in km²), GDP (in the international dollar), and
population for countries around the world, along with the cities in the word that have populations exceeding 1 million
people.

![](/images/interaction.gif)

## Background

Data Correlator will be a single-page app that features a circle packing graph filtered by continent and country. You can explore the loaded datasets through the interactive graph and learn more about how countries vary by area, population, and GDP and the ways these correlate with each other.

![](/images/comparison.gif)

## Functionality & MVP

With Data Correlator, users are able to:

1. See a circle packing map of experiences to explore
2. Interact with the circle packing graph with your mouse
3. Select different circle packing graphs to compare

## Technologies

Data Correlator uses:

1. JavaScript, HTML, CSS
2. D3.js library to create circle packing graph visualization

## Challenges

The main challenges were incorporating the D3 library to allow for an interactive circle packing graph. I created the nodes to be set up with their parent and children nodes, so that each node was linked with a set of dependents. 

The zoomTo function takes in a view and then finds the proportion of the width to the diameter, and updates the chat view to align with the argument view. It then transforms the labels and nodes and updates the node's radius.

The zoom function then takes in an event and a node. It creates an old focus variable that stores the previous focus and sets the focus to the new node selected. It creates a transition constant by invoking transition on the svg and set's the transition's duration. I then am able to call on the transition and create an interpolator between the old and new views, so that the transition is as smooth as possible. This way as you are manueving throughout the data sets, you are able to understand the relationships between the nodes much more clearly. 