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
  Dijkstra(start, end) {
    let distances = {};
    let pq = new PriorityQueue();
    let previous = {};

    for (let vertex of this.adjacencyList.keys()) {
      if (vertex !== start) {
        distances[vertex] = Infinity;
        pq.enqueue(vertex, Infinity);
      } else {
        distances[start] = 0;
        pq.enqueue(start, 0);
      }
      previous[vertex] = null;
    }

    while (pq.size() !== 0) {
      let current = pq.dequeue();

      // Sprawdzenie 1: Czy osiągnięto cel?
      if (current.val === end) {
        break;
      }
      // Sprawdzenie 2: Czy wierzchołek jest nieosiągalny?
      if (distances[current.val] === Infinity) {
        continue; // Pomiń resztę tej iteracji, przejdź do następnego elementu w kolejce
      }

      for (let [neighbor, weight] of this.adjacencyList.get(current.val).entries()) {
        let potentialNewDistance = distances[current.val] + weight;
        if (potentialNewDistance < distances[neighbor]) {
          distances[neighbor] = potentialNewDistance;
          previous[neighbor] = current.val;
          pq.enqueue(neighbor, potentialNewDistance);
        }
      }
    }
    return { distances, previous };
  }
  getShortestPath(start, end, previous) {
    let path = [];

    let currentNode = end;

    while (currentNode !== null) {
      path.push(currentNode);
      currentNode = previous[currentNode];
    }
    return path.reverse();
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
  size() {
    return this.values.length;
  }
}

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

let graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2); // Jest C do D
graph.addEdge("C", "F", 4); // Jest C do F
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);
graph.addEdge("C", "E", 2);

console.log("---------- Testowanie ----------");

// Używamy grafu 'graph', który już zdefiniowałeś i wypełniłeś

// Wywołaj algorytm Dijkstry ze startu "A" do celu "E"
let results = graph.Dijkstra("A", "F");
let distances = results.distances;
let previous = results.previous; // Pamiętaj, że Dijkstra zwraca teraz oba obiekty

console.log("Najkrótsze odległości od wierzchołka A:");
console.log(distances); // Powinno pokazać odległość do każdego wierzchołka

console.log("\nObiekt 'previous' (do odtworzenia ścieżek):");
console.log(previous); // Pokazuje skąd przyszliśmy najkrótszą drogą do każdego wierzchołka

// Teraz użyjemy obiektu 'previous' do odtworzenia ścieżki z A do E
// Pamiętaj, że metoda getShortestPath musi przyjąć obiekt previous jako argument!
// Musisz ją dodać do klasy WeightedGraph
let shortestPath = graph.getShortestPath("A", "F", previous);

console.log("\nNajkrótsza ścieżka z A do F:");
console.log(shortestPath); // Powinno zwrócić tablicę wierzchołków tworzących ścieżkę

console.log("---------- Koniec Testowania ----------");

// Przykładowe testy innych ścieżek (opcjonalnie)
// let results_AF = graph.Dijkstra("A", "F");
// let path_AF = graph.getShortestPath("A", "F", results_AF.previous);
// console.log("\nNajkrótsza ścieżka z A do F:", path_AF); // Powinno być A -> C -> D -> F (2 + 2 + 1 = 5) lub A -> B -> E -> F (4 + 3 + 1 = 8, dłuższa) -> C -> D -> F (5)

// let results_BF = graph.Dijkstra("B", "F");
// let path_BF = graph.getShortestPath("B", "F", results_BF.previous);
// console.log("\nNajkrótsza ścieżka z B do F:", path_BF); // Powinno być B -> D -> F (3 + 1 = 4)
