class RandomizedSet {
    map: Record<number, number>;
    list: number[];
    
    constructor() {
        this.map = {};
        this.list = [];
    }

    insert(val: number): boolean {
        if (val in this.map) {
            return false;
        }

        this.list.push(val);
        this.map[val] = this.list.length - 1;
        return true;
    }

    remove(val: number): boolean {
        if (!(val in this.map)) {
            return false;
        }

        const indexToRemove = this.map[val];
        const lastElement = this.list[this.list.length - 1];

        this.list[indexToRemove] = lastElement;
        this.map[lastElement] = indexToRemove;
        this.list.pop();
        delete this.map[val];

        return true;
    }

    getRandom(): number {
        const randomIndex = Math.floor(Math.random() * this.list.length);
        return this.list[randomIndex];
    }
}