/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val = (val===undefined ? 0 : val)
 * this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let currentL1 = l1;
  let currentL2 = l2;
  let carry = 0;

  // Wartownik dla nowej listy
  const dummyHead = new ListNode(0); // Wartość w wartowniku nie ma znaczenia
  // Wskaźnik na aktualny węzeł w budowanej liście, zaczyna od wartownika
  let tailOfNewList = dummyHead;

  // Pętla kontynuuje, dopóki są cyfry w którejkolwiek z list LUB istnieje przeniesienie
  while (currentL1 !== null || currentL2 !== null || carry !== 0) {
    // Pobierz wartość z bieżącego węzła l1 lub 0, jeśli l1 się skończyła
    const val1 = currentL1 ? currentL1.val : 0;
    // Pobierz wartość z bieżącego węzła l2 lub 0, jeśli l2 się skończyła
    const val2 = currentL2 ? currentL2.val : 0;

    const sum = val1 + val2 + carry;
    const digit = sum % 10; // Cyfra do nowego węzła
    carry = Math.floor(sum / 10); // Nowe przeniesienie

    // Stwórz nowy węzeł z obliczoną cyfrą i dołącz go do końca nowej listy
    tailOfNewList.next = new ListNode(digit);
    // Przesuń wskaźnik ogona na nowo dodany węzeł
    tailOfNewList = tailOfNewList.next;

    // Przesuń wskaźniki list wejściowych na następne węzły, jeśli istnieją
    if (currentL1) currentL1 = currentL1.next;
    if (currentL2) currentL2 = currentL2.next;
  }

  // Zwróć listę wynikową, pomijając wartownika (dummyHead)
  return dummyHead.next;
};
