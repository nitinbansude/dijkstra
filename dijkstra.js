/*
    Jadi intinya algoritma dijsktra itu dia nyari length optimal path dari source node ke node tsb, dan utk maju sampe ke destination node, dia bakalan nyari yang paling minimum
*/

//var graph = {A: {B: 5, C: 10}, B: {A: 5, C: 4, D: 11}, C: {A: 10, B: 4, D: 5}, D: {B: 11, C: 5}};
var graph = {A: {B: 10, C: 5}, B: {A: 10, D: 12, C: 8, E: 6}, C: {A: 5, B: 8, E: 12}, D: {B: 12, E: 5, F: 4}, E: {C: 12, B: 6, D: 5, F: 6}, F: {D: 4, E: 6}};
var source = 'D';
var destination = 'C';

var unsettled = [];
var dijkstra = [];
var current_node = source;
var phi = 0;

// init dijsktra
for(var key in graph) {
    unsettled.push(key);
    dijkstra[key] = Infinity;
}

dijkstra[current_node] = 0;

// start dijkstra
while(unsettled.length > 0 && current_node !== destination) {
    
    var queue = [];
    var adjNodes = graph[current_node];
    
    for(var key in adjNodes) {
        
        // process only unsettled node
        if(unsettled.indexOf(key) > -1) {
            dijkstra[key] = Math.min(dijkstra[key], phi + adjNodes[key]);
        }
    }
    
    var keyMin = unsettled[0];
    for(var i = 0; i < unsettled.length; i++) {
        
        if(dijkstra[keyMin] > dijkstra[unsettled[i]]) {
            keyMin = unsettled[i];
        }
    }
    
    current_node = keyMin;
    phi = dijkstra[current_node];
    
    unsettled.splice(unsettled.indexOf(current_node), 1); // remove current node from unsettled
}

console.log(dijkstra);
console.log("optimum length from " + source + " to " + destination + ": " + dijkstra[destination]);

