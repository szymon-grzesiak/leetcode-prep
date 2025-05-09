// https://www.hackerrank.com/challenges/30-dictionaries-and-maps/problem

function processData(input) {
  // Krok 1: Podział całego inputu na tablicę pojedynczych linii.
  // 'input' to jeden długi string, np. "3\nsam 99912222\ntom 11122222\n..."
  // .split('\n') dzieli go w miejscach, gdzie jest znak nowej linii ('\n').
  const lines = input.split("\n");

  // Użyjemy wskaźnika, aby śledzić, którą linię aktualnie przetwarzamy.
  let currentLineIndex = 0;

  // Funkcja pomocnicza do odczytywania i przesuwania wskaźnika na następną linię.
  // Dzięki temu kod będzie czytelniejszy.
  function readNextLine() {
    // Pobieramy linię o bieżącym indeksie i OD RAZU zwiększamy indeks
    // na potrzeby następnego wywołania.
    return lines[currentLineIndex++];
  }

  // Krok 2: Wczytanie liczby wpisów do książki.
  // Pierwsza linia (lines[0]) zawiera liczbę n.
  // parseInt() konwertuje string (np. "3") na liczbę całkowitą (np. 3).
  const n = parseInt(readNextLine());

  // Krok 3: Tworzenie książki telefonicznej.
  // Używamy obiektu Map, który jest idealny do przechowywania par klucz-wartość.
  // Kluczem będzie imię (string), wartością będzie numer telefonu (string).
  let phoneBook = new Map();

  // Wczytujemy 'n' kolejnych linii, aby zbudować książkę telefoniczną.
  for (let i = 0; i < n; i++) {
    // Wczytujemy całą linię, np. "sam 99912222"
    const entryLine = readNextLine();

    // Dzielimy linię po spacji, aby oddzielić imię od numeru.
    // "sam 99912222".split(' ') da nam tablicę ["sam", "99912222"]
    const parts = entryLine.split(" ");
    const name = parts[0]; // Pierwszy element to imię
    const phoneNumber = parts[1]; // Drugi element to numer

    // Dodajemy wpis do naszej książki telefonicznej.
    // Metoda .set(klucz, wartość) służy do dodawania/aktualizowania par w Map.
    phoneBook.set(name, phoneNumber);
  }

  // Krok 4: Przetwarzanie zapytań.
  // Teraz będziemy wczytywać linie aż do końca dostępnych danych.
  // Pętla while będzie kontynuowana, dopóki currentLineIndex jest mniejszy
  // niż całkowita liczba linii w naszym input'cie.
  let queryName;
  while (currentLineIndex < lines.length) {
    // Wczytujemy linię z zapytaniem (powinno to być samo imię).
    queryName = readNextLine();

    // Sprawdzenie na wszelki wypadek:
    // Jeśli readNextLine() zwróci undefined (bo np. currentLineIndex wyszedł poza zakres)
    // lub jeśli linia jest pusta (co może się zdarzyć, jeśli input ma puste linie na końcu),
    // to przerywamy pętlę lub kontynuujemy do następnej iteracji.
    if (queryName === undefined || queryName.trim() === "") {
      // .trim() usuwa białe znaki z początku i końca stringa.
      // Jeśli po usunięciu białych znaków string jest pusty, to znaczy, że linia była pusta
      // lub zawierała tylko białe znaki.
      continue; // Przejdź do następnej iteracji pętli (jeśli są jeszcze linie)
    }

    // Sprawdzamy, czy wczytane imię (queryName) istnieje w naszej książce telefonicznej.
    // Metoda .has(klucz) zwraca true, jeśli klucz istnieje w Map, w przeciwnym razie false.
    if (phoneBook.has(queryName)) {
      // Jeśli imię istnieje, pobieramy numer telefonu za pomocą .get(klucz).
      // Następnie drukujemy wynik w wymaganym formacie.
      console.log(`${queryName}=${phoneBook.get(queryName)}`);
    } else {
      // Jeśli imienia nie ma w książce, drukujemy "Not found".
      console.log("Not found");
    }
  }
}

// Ten fragment kodu poniżej jest standardowym kodem startowym HackerRank
// i odpowiada za wczytanie całego inputu przed wywołaniem processData.
// Nie musisz go modyfikować.
process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (inputStdin) {
  // 'inputStdin' to fragment danych
  _input += inputStdin; // Doklejamy fragment do całości
});

process.stdin.on("end", function () {
  processData(_input); // Gdy wszystko wczytane, przekazujemy do naszej funkcji
});
