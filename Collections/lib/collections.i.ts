import { IEnumerator } from "./enumerator.i";
import { IEnumerable } from "./i.enumerable";

export interface ICollection<T> extends IEnumerable<T>{
    Count(): number;

    IsReadOnly(): boolean;

    Add(value: T): void;

    Clear(): void;

    Contains(item: T):  boolean;

    CopyTo(array: T[], startingIndex: number): void;

    Remove(item: T): boolean;

    ToArray(): T[];
}