class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  print() {
    let current = this.head;
    let s = "";
    while (current) {
      s += `${current.value} => `;
      current = current.next;
    }
    console.log(s + "null");
  }
  push(value) {
    let newNode = new ListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }
  pop() {
    let currentTail = this.tail;
    if (this.length === 0) return undefined;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
      currentTail.prev = null;
    }

    this.length--;
    return currentTail;
  }
  shift() {
    if (!this.head) return undefined;

    let current = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
      current.next = null;
      current.prev = null;
    }
    this.length--;
    return current;
  }
  unshift(value) {
    let newNode = new ListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  // get(2)
  // 1, 2, 3, 4, 5 middle = 5 / 2 = 2
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let current, count;

    if (index <= this.length / 2) {
     count = 0;
     current = this.head;
     while(count !== index) {
        current = current.next;
        count++;
      }
    } else {
      count = this.length - 1;
      current = this.tail;
      while(count !== index) {
        current = current.prev;
        count--;
      }
    }
    return current;
  }
  set(index, value) {
    let item = this.get(index);
    if (item) {
      item.value = value;
      return true;
    }
    return false;
  }
  //      2.5
  // 1   2   3   4   5
  insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);

    let newNode = new ListNode(value);
    let targetElement = this.get(index);
    let prevElement = targetElement.prev;

    prevElement.next = newNode;
    targetElement.prev = newNode;

    newNode.prev = prevElement;
    newNode.next = targetElement;

    this.length++;
    return true;
  }
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    // 1   2   3   4   5 remove(2)  3 element
    let deletedItem = this.get(index);
    let prev = deletedItem.prev;
    let nextItem = deletedItem.next;

    prev.next = nextItem;
    nextItem.prev = prev;

    this.length--;
    deletedItem.next = null;
    deletedItem.prev = null;
    return deletedItem;
  }
  reverse() {
    if (!this.head || this.length <= 1) {
      return;
    }

    let current = this.head;
    let temp;

    temp = this.head;
    this.head = this.tail;
    this.tail = temp;

    for (let i = 0; i < this.length; i++) {
      temp = current.next;
      current.next = current.prev;
      current.prev = temp;

      current = temp;
    }

    return this;
  }
}

let newDDL = new DoublyLinkedList();
newDDL.push(5);
newDDL.push(10);
newDDL.push(15);
newDDL.push(20);
newDDL.push(25);
newDDL.print();
newDDL.reverse();
newDDL.print();
