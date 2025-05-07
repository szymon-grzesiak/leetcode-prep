class WeightedGraph {
  constructor() {
    this.adjacencyList = new Map();
  }
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Map());
      return vertex; 
    } else {
      return "vertex exist";
    }
  }
  addEdge(vertex1, vertex2, weight) {
    if (!this.adjacencyList.has(vertex1)) this.addVertex(vertex1);
    if (!this.adjacencyList.has(vertex2)) this.addVertex(vertex2);

    this.adjacencyList.get(vertex1).set(vertex2, weight);
    this.adjacencyList.get(vertex2).set(vertex1, weight); 
  }
  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList.has(vertex1) && this.adjacencyList.has(vertex2)) {
      this.adjacencyList.get(vertex1).delete(vertex2);
      this.adjacencyList.get(vertex2).delete(vertex1);
    }
  }
  removeVertex(vertex) {
    if (this.adjacencyList.has(vertex)) {
      // Iterujemy po sąsiadach w Mapie (klucze to sąsiedzi)
      for (const neighbor of this.adjacencyList.get(vertex).keys()) {
        // Usuwamy krawędź z perspektywy sąsiada
        if (this.adjacencyList.has(neighbor)) {
          // Dodatkowy check na wszelki wypadek
          this.adjacencyList.get(neighbor).delete(vertex);
        }
      }
      // Usuwamy sam wierzchołek z głównej listy sąsiedztwa
      this.adjacencyList.delete(vertex);
    }
  }
}


let wg = new WeightedGraph();
wg.addVertex("A");
wg.addVertex("B");
wg.addVertex("C");

wg.addEdge("A", "B", 9); // Dodaje A->B z wagą 9
wg.addEdge("A", "B", 10); // Zmienia wagę A->B na 10 (nie dodaje duplikatu)
wg.addEdge("A", "B", 10); // Zmienia wagę A->B na 10 (nie dodaje duplikatu)
wg.addEdge("A", "C", 5); // Dodaje A->C z wagą 5
wg.addEdge("B", "C", 7); // Dodaje B->C z wagą 7

console.log(wg.adjacencyList);
