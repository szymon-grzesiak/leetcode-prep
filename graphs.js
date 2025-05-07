// undirected graph
class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(names) {
    if (!this.adjacencyList[names]) {
      return (this.adjacencyList[names] = new Set());
    } else {
      return "vertex exist";
    }
  }
  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) this.addVertex(vertex1);
    if (!this.adjacencyList[vertex2]) this.addVertex(vertex2);

    this.adjacencyList[vertex1].add(vertex2);
    this.adjacencyList[vertex2].add(vertex1);
  }
  removeEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) return;

    this.adjacencyList[vertex1].delete(vertex2);
    this.adjacencyList[vertex2].delete(vertex1);
  }
  removeVertex(vertex) {
    if (this.adjacencyList[vertex]) {
      for (const neighbor of this.adjacencyList[vertex]) {
        this.adjacencyList[neighbor].delete(vertex);
      }
      delete this.adjacencyList[vertex];
    }
  }
  dfsRecursive(start) {
    const results = [];
    const visited = new Set();

    const dfsHelper = (vertex) => {
      visited.add(vertex);
      results.push(vertex);

      for (let neighbor of this.adjacencyList[vertex]) {
        if (!visited.has(neighbor)) {
          dfsHelper(neighbor);
        }
      }
    };
    //      A
    //     / \
    //    B   C
    //   / \   \
    //  D   E   F
    dfsHelper(start);
    return results;
  }
  dfsIterative(start) {
    if (!start) return;

    const stack = [start];
    const visited = new Set([start]);
    const results = [];

    while (stack.length > 0) {
      const vertex = stack.pop();

      results.push(vertex);

      for (let neighbor of this.adjacencyList[vertex]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
    }

    return results;
  }
  bfs(start) {
    if (!start) return;
    let results = [];
    let visited = new Set();
    let q = [start];
    visited.add(start);

    while (q.length !== 0) {
      let current = q.shift();
      results.push(current);

      for (let neighbor of this.adjacencyList[current]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          q.push(neighbor);
        }
      }
    }
    return results;
  }
}

let g = new Graph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");
console.log(g.adjacencyList);

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F
