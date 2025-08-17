/**
 * Funkcja sprawdzająca czy istnieje droga z lewego górnego narożnika do prawego dolnego
 * z uwzględnieniem ograniczeń: budżetu oraz zakazu odwiedzania sąsiednich miast o tej samej nazwie
 * @param {string[][]} cityMap - mapa miast (tablica dwuwymiarowa z nazwami miast)
 * @param {Object} costs - obiekt zawierający koszty wjazdu do miast
 * @param {number} budget - dostępny budżet
 * @return {boolean} - czy istnieje droga spełniająca warunki
 */
function canReachDestination(cityMap, costs, budget) {
  if (!cityMap || cityMap.length === 0 || cityMap[0].length === 0) {
    return false;
  }

  // Wymiary mapy
  const rows = cityMap.length;
  const cols = cityMap[0].length;
  
  // Współrzędne początkowe i końcowe
  const startRow = 0;
  const startCol = 0;
  const endRow = rows - 1;
  const endCol = cols - 1;

  // Tablica do śledzenia odwiedzonych miast
  const visited = Array(rows).fill().map(() => Array(cols).fill(false));
  
  // Definiujemy kierunki ruchu: prawo, dół, lewo, góra
  const directions = [
    [0, 1],  // prawo
    [1, 0],  // dół
    [0, -1], // lewo
    [-1, 0]  // góra
  ];
  
  // Kolejka do BFS, zawierająca stan: [wiersz, kolumna, pozostały budżet]
  const queue = [[startRow, startCol, budget - costs[cityMap[startRow][startCol]]]];
  visited[startRow][startCol] = true;
  
  while (queue.length > 0) {
    const [currentRow, currentCol, remainingBudget] = queue.shift();
    
    // Sprawdzamy czy dotarliśmy do celu
    if (currentRow === endRow && currentCol === endCol) {
      return true;
    }
    
    // Sprawdzamy każdy możliwy kierunek ruchu
    for (const [dr, dc] of directions) {
      const newRow = currentRow + dr;
      const newCol = currentCol + dc;
      
      // Sprawdzamy czy nowe współrzędne są w granicach mapy
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        // Sprawdzamy czy już odwiedziliśmy to miasto
        if (!visited[newRow][newCol]) {
          const currentCity = cityMap[currentRow][currentCol];
          const nextCity = cityMap[newRow][newCol];
          
          // Sprawdzamy czy sąsiednie miasto nie ma tej samej nazwy
          if (currentCity !== nextCity) {
            // Obliczamy koszt wjazdu do następnego miasta
            const nextCost = costs[nextCity];
            
            // Sprawdzamy czy mamy wystarczający budżet
            if (remainingBudget >= nextCost) {
              // Dodajemy do kolejki i oznaczamy jako odwiedzone
              queue.push([newRow, newCol, remainingBudget - nextCost]);
              visited[newRow][newCol] = true;
            }
          }
        }
      }
    }
  }
  
  // Jeśli przeszukaliśmy wszystkie możliwe drogi i nie dotarliśmy do celu
  return false;
}

// Przykład użycia:
const cityMap = [
  ["Poland", "Poland", "Germany"],
  ["Italy", "Ukraine", "Sweden"],
  ["Germany", "Poland", "Czech"]
];

const costs = {
  "Poland": 3,
  "Germany": 3,
  "Italy": 5,
  "Czech": 2,
  "Sweden": 4,
  "Ukraine": 5
};

const budget = 10;

console.log(canReachDestination(cityMap, costs, budget));