class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value) {
    let newNode = new Node(value);

    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.size++;
    return this.size;
  }
  dequeue() {
    if (!this.first) return null;

    let temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.value;
  }
}

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    let newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;

      return this;
    } else {
      let current = this.root;

      while (true) {
        if (value === current.value) return undefined;
        if (newNode.value > current.value) {
          if (!current.right) {
            current.right = newNode;
            return this;
          }
          current = current.right;
        } else {
          if (!current.left) {
            current.left = newNode;
            return this;
          }
          current = current.left;
        }
      }
    }
  }
  find(value) {
    let current = this.root;
    while (current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return current;
      }
    }
    return null;
  }
  find2(value) {
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (current.left) {
          current = current.left;
        } else {
          return null;
        }
      } else if (value > current.value) {
        if (current.right) {
          current = current.right;
        } else {
          return null;
        }
      } else {
        return current;
      }
    }
  }
  deleteNode(root, key) {
    if (!root) return null;

    if (key < root.val) {
      root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
      root.right = deleteNode(root.right, key);
    } else {
      // 🔴 Znaleźliśmy węzeł do usunięcia

      // 1️⃣ Liść:
      if (!root.left && !root.right) {
        return null;
      }
      // 2️⃣ Jedno dziecko:
      else if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }
      // 3️⃣ Dwoje dzieci:
      else {
        // a) znajdź następnik (minimum z prawego poddrzewa)
        let successor = findMin(root.right);
        // b) skopiuj wartość
        root.val = successor.val;
        // c) usuń następcę rekurencyjnie
        root.right = deleteNode(root.right, successor.val);
      }
    }
    return root;
  }
  findMin(node) {
    while (node.left) node = node.left;
    return node;
  }
  findSecondLargest(root) {
    if (!root || (!root.left && !root.right)) {
      return null; // Potrzebujemy co najmniej 2 węzłów
    }

    let current = root;
    let parent = null;

    while (current.right) {
      parent = current;
      current = current.right;
    }

    // Jeśli największy node ma lewe poddrzewo → szukamy tam maxa
    if (current.left) {
      current = current.left;
      while (current.right) {
        current = current.right;
      }
      return current.val;
    }

    // W przeciwnym razie, jego rodzic to drugi największy
    return parent.value;
  }
  isBalanced() {
    const check = (node) => {
      if (!node) return 0;

      const left = check(node.left);
      if (left === -1) return -1;

      const right = check(node.right);
      if (right === -1) return -1;

      if (Math.abs(left - right) > 1) return -1;

      return Math.max(left, right) + 1;
    };

    return check(this.root) !== -1;
  }
  bfs() {
    if (!this.root) return [];

    const queue = [this.root];
    const visited = [];

    while (queue.length > 0) {
      const node = queue.shift(); // usuwa pierwszy element z kolejki
      visited.push(node.value);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return visited;
  }

  dfsPreOrder() {
    if (!this.root) return [];

    const stack = [this.root];
    const values = [];

    while (stack.length > 0) {
      const node = stack.pop();
      values.push(node.value);

      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }

    return values;
  }

  dfsPostOrder() {
    const values = [];

    function traverse(node) {
      if (node === null) return;

      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      values.push(node.value);
    }
    traverse(this.root);

    return values;
  }
  dfsPostOrder() {
    const values = [];
    const stack = [];
    let lastVisited = null;
    let current = this.root;
  
    while (current || stack.length > 0) {
      if (current) {
        stack.push(current);
        current = current.left;
      } else {
        let peekNode = stack[stack.length - 1];
        if (peekNode.right && lastVisited !== peekNode.right) {
          current = peekNode.right;
        } else {
          values.push(peekNode.value);
          lastVisited = stack.pop();
        }
      }
    }

    return values;
  }
  dfsInOrder() {
    const values = [];
    const stack = [];
    let current = this.root;
  
    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
  
      current = stack.pop();
      values.push(current.value);
      current = current.right;
    }
  
    return values;
  }
  
//     10
//    /  \
//   5    15
//  / \     \
// 3   7     20
}

//                 15
//              /      \
//            6         20
//          /   \      /  \
//         3     8    17   25
//        / \   / \       /  \
//       1   4 7   10    23   30
//            \   /     / \
//             5 9     21 24

let bst = new BinarySearchTree();
bst.insert(15);

// Lewa gałąź
bst.insert(6);
bst.insert(3);
bst.insert(1);
bst.insert(4);
bst.insert(5); // prawy potomek 4
bst.insert(8);
bst.insert(7);
bst.insert(10);
bst.insert(9); // lewy potomek 10

// Prawa gałąź
bst.insert(20);
bst.insert(17);
bst.insert(25);
bst.insert(23);
bst.insert(21); // lewy potomek 23
bst.insert(24); // prawy potomek 23
bst.insert(30);
console.log(bst.dfsPreOrder());
console.log(bst.dfsPostOrder());
console.log(bst.dfsInOrder());
