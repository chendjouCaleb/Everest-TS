export interface ICollection<T> extends Enumerator<T>{
    Count(): number;

    IsReadOnly(): boolean;

    Add(value: T): void;

    Clear(): void;

    Contains():  void;

    CopyTo(array: T[], startingIndex: number): void;

    Remove(item: T): void;

    ToArray(): T[];
}