class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    if (!this.head) return undefined;

    if (this.length === 1) {
      const popped = this.head;
      this.head = null;
      this.tail = null;
      this.length--;
      return popped;
    }
    let current = this.head;
    // Szukamy przedostatniego elementu
    while (current.next !== this.tail) {
      current = current.next;
    }

    const popped = this.tail;
    current.next = null;
    this.tail = current;
    this.length--;

    return popped;
  }
  shift() {
    if (!this.head) return undefined;

    let currentHead = this.head;
    
    this.head = currentHead.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return currentHead;
  }
  unshift(val) {
    let newNode = new Node(val);
        
    if(!this.head) {
        this.head = newNode;
        this.tail = newNode;
    } else {
        newNode.next = this.head;
        this.head = newNode;
    }
    this.length++;
    return this;
  }
  get(index) {
    if (index < 0 && index > this.length) return null;
    let current = this.head;

    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }
  set(index, value) {
    let current = this.get(index);
    if (current) {
      current.val = value;
      return true;
    }
  }
  insert(index, value) {
    if(index < 0 || index > this.length) return false;
      if(index === 0) return !!this.unshift(value); 
      if(index === this.length) return !!this.push(value);
    
      let newNode = new Node(value);
      let prev = this.get(index - 1);
      newNode.next = prev.next;
      prev.next = newNode;
     
      this.length++;
      return true;
          // 2.5
      // 1, 2, 3, 4, 5
  }
  remove(index) {
    if(index < 0 || index >= this.length) return undefined;
       if(index === this.length - 1) return this.pop();
       if(index === 0) return this.shift();
       
       let previous = this.get(index - 1);
       let removed = previous.next;
       previous.next = removed.next;
       this.length--;
       return removed;
  }
  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next;
    let prev = null;
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }
  print() {
    let arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    console.log(arr);
  }
  rotate(index) {
    if (!this.head || this.length === 0 || index === 0) return this;

    // Normalizacja indeksu:
    let rot = index % this.length;
    if (rot < 0) rot = this.length + rot; // obsługa liczb ujemnych

    if (rot === 0) return this;

    // znajdź nowy "ogon" (index - 1) i nową głowę
    let newTail = this.get(rot - 1);
    let newHead = newTail.next;

    this.tail.next = this.head; // zamykamy pętlę
    this.head = newHead;
    this.tail = newTail;
    this.tail.next = null;

    return this;
  }
}
