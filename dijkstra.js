/*
    Jadi intinya algoritma dijsktra itu dia nyari length optimal path dari source node ke node tsb, dan utk maju sampe ke destination node, dia bakalan nyari yang paling minimum
*/

//var graph = {A: {B: 5, C: 10}, B: {A: 5, C: 4, D: 11}, C: {A: 10, B: 4, D: 5}, D: {B: 11, C: 5}};
var graph = {A: {B: 10, C: 5}, B: {A: 10, D: 12, C: 8, E: 6}, C: {A: 5, B: 8, E: 12}, D: {B: 12, E: 5, F: 4}, E: {C: 12, B: 6, D: 5, F: 6}, F: {D: 4, E: 6}};
var source = 'A';
var destination = 'D';

var settled = [];
var dijkstra = [];
var current_node = source;
var graph_length = 0;
var phi = 0;
var path = [];

// init dijsktra
for(var key in graph) {
    dijkstra[key] = Infinity;
    graph_length++;
}

dijkstra[current_node] = 0;
settled.push(current_node);
path.push(current_node);

// start dijkstra
while(settled.length < graph_length && current_node !== destination) {
    
    var queue = [];
    var adjNodes = graph[current_node];
    
    for(var key in adjNodes) {
        
        // process only unsettled node
        if(settled.indexOf(key) === -1) {
            
            // mark for path
            var changeTailPath = 0;
            if(dijkstra[key] < phi + adjNodes[key])
                changeTailPath = 1;
            
            dijkstra[key] = Math.min(dijkstra[key], phi + adjNodes[key]);
            queue.push({key: key, val: dijkstra[key], changeTailPath: changeTailPath});
        }
    }
    
    if(queue.length > 0) {
        
        var idxMin = 0;
        for(var i = 0; i < queue.length; i++) {

            if(queue[i].val < queue[idxMin].val) {
                idxMin = i;
            }
        }
        
        current_node = queue[idxMin].key;
        
        /* 
            if the minimum cost is not from previous node then replace 
            the node on path, else append current node
        */
        
        if(queue[idxMin].changeTailPath) {
            path[path.length - 1] = current_node;
        } else {
            path.push(current_node);
        }
        
        phi = dijkstra[current_node];
        settled.push(current_node);
    }
}

console.log(dijkstra);
console.log("optimum length from " + source + " to " + destination + ": " + dijkstra[destination]);
console.log("optimum path: " + path.join(' -> '));

