// class Node {
//     constructor(value) {
//         this.value = value;
//         this.next = null;
//     }
// }

// class Queue {
//     constructor() {
//         this.first = null;
//         this.last = null;
//         this.size = null;
//     }

//     enqueue(value) {
//         let newNode = new Node(value);

//         if(!this.first) {
//             this.first = newNode;
//             this.last = newNode;
//         } else {
//             this.last.next = newNode;
//             this.first = newNode;
//         }
//         this.size++;
//         return this.size;
//     }
//     dequeue() {
//         if(!this.first) return null;

//         let temp = this.first;
//         if(this.first === this.last) {
//             this.last = null;
//         }
//         this.first = this.first.next;
//         this.size--;
//         return temp.value;
//     }
// }