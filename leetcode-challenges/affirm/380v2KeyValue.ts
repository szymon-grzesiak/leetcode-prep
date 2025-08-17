// ZMIANA: Nazwa klasy dla większej czytelności.
class RandomizedMap {
    map: Map<any, number>;
    list: { key: any; value: any }[];

    constructor() {
        this.map = new Map();
        this.list = [];
    }

    insert(key: any, value: any): boolean {
        if (this.map.has(key)) {
            return false;
        }

        this.list.push({ key: key, value: value });
        this.map.set(key, this.list.length - 1);
        return true;
    }

    remove(key: any): boolean {
        if (!this.map.has(key)) {
            return false;
        }

        const indexToRemove = this.map.get(key)!;
        const lastPair = this.list[this.list.length - 1];

        this.list[indexToRemove] = lastPair;
        this.map.set(lastPair.key, indexToRemove);
        this.list.pop();
        this.map.delete(key);

        return true;
    }

    getRandom(): any {
        const randomIndex = Math.floor(Math.random() * this.list.length);
        return this.list[randomIndex].value;
    }
}