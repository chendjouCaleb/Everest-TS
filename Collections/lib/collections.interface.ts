import { IEnumerator } from "./enumerator.interface";
import { IEnumerable } from "./enumerable.interface";

export interface ICollection<T> extends IEnumerable<T>{
    count(): number;

    isReadOnly(): boolean;

    add(value: T): void;

    clear(): void;

    contains(item: T):  boolean;

    copyTo(array: T[], startingIndex: number): void;

    remove(item: T): boolean;

    toArray(): T[];
}