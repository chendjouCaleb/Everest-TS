import { IList } from "./list/list.interface";

export class LinkedList<T> implements IList<T>{
    get(index: number): T {
        throw new Error("Method not implemented.");
    }    indexOf(item: T): number {
        throw new Error("Method not implemented.");
    }
    insert(index: number, item: T): void {
        throw new Error("Method not implemented.");
    }
    removeAt(index: number): void {
        throw new Error("Method not implemented.");
    }
    count(): number {
        throw new Error("Method not implemented.");
    }
    isReadOnly(): boolean {
        throw new Error("Method not implemented.");
    }
    add(value: T): void {
        throw new Error("Method not implemented.");
    }
    clear(): void {
        throw new Error("Method not implemented.");
    }
    contains(item: T): boolean {
        throw new Error("Method not implemented.");
    }
    copyTo(array: T[], startingIndex: number): void {
        throw new Error("Method not implemented.");
    }
    remove(item: T): boolean {
        throw new Error("Method not implemented.");
    }
    toArray(): T[] {
        throw new Error("Method not implemented.");
    }
    getEnumerator(): import("./enumerator.interface").IEnumerator<T> {
        throw new Error("Method not implemented.");
    }


}