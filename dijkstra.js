/*
    Jadi intinya algoritma dijsktra itu dia nyari length optimal path dari source node ke node tsb, dan utk maju sampe ke destination node, dia bakalan nyari yang paling minimum
*/

//var graph = {A: {B: 5, C: 10}, B: {A: 5, C: 4, D: 11}, C: {A: 10, B: 4, D: 5}, D: {B: 11, C: 5}};
var graph = {A: {B: 10, C: 5}, B: {A: 10, D: 12, C: 8, E: 6}, C: {A: 5, B: 8, E: 12}, D: {B: 12, E: 5, F: 4}, E: {C: 12, B: 6, D: 5, F: 6}, F: {D: 4, E: 6}};
var source = 'F';
var destination = 'D';

// param for executing dijkstra
var unsettled = [];
var dijkstra = [];
var current_node = source;
var phi = 0;

// params for trackback
var change_val_log = [];
var settled_log = [];
var iteration = 0;

// init dijsktra
for(var key in graph) {
    unsettled.push(key);
    dijkstra[key] = Infinity;
}

dijkstra[current_node] = 0;
unsettled.splice(unsettled.indexOf(current_node), 1);
settled_log.push(current_node);
iteration++;

// start dijkstra
while(unsettled.length > 0 && current_node !== destination) {
    
    var queue = [];
    var adjNodes = graph[current_node];
    
    for(var key in adjNodes) {
        
        // process only unsettled node
        if(unsettled.indexOf(key) > -1) {
            
            var tmpVal = dijkstra[key];
            dijkstra[key] = Math.min(dijkstra[key], phi + adjNodes[key]);
            
            // log if value changed
            if(tmpVal !== dijkstra[key]) {
                change_val_log[key] = iteration;
            }
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
    settled_log[iteration] = current_node;
    iteration++; // increase iteration
}

// do trackback
var path = [];
if(dijkstra[destination]) {
    
    current_node = destination;
    path.push(current_node);
    
    do {
        
        current_node = settled_log[change_val_log[current_node] - 1];
        path.push(current_node);
        
    } while(current_node != source);
}
    
console.log(dijkstra);
console.log("optimum length from " + source + " to " + destination + ": " + dijkstra[destination]);
console.log("optimum path: " + path.reverse().join(' -> '));
