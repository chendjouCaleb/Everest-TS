import { ICollection } from "./collections.i";

export class Collection<T> implements ICollection<T>{
    private length: number = 0;
    Count(): number{
        return this.length;
    }    
    
    IsReadOnly(): boolean{
        return false;
    }
    Add(value: T): void {
        throw new Error("Method not implemented.");
    }
    Clear(): void {
        throw new Error("Method not implemented.");
    }
    Contains(): void {
        throw new Error("Method not implemented.");
    }
    CopyTo(array: T[], startingIndex: number): void {
        throw new Error("Method not implemented.");
    }
    Remove(item: T): void {
        throw new Error("Method not implemented.");
    }
    ToArray(): T[] {
        throw new Error("Method not implemented.");
    }
    atEnd(): boolean {
        throw new Error("Method not implemented.");
    }
    item(): T {
        throw new Error("Method not implemented.");
    }
    moveFirst(): void {
        throw new Error("Method not implemented.");
    }
    moveNext(): void {
        throw new Error("Method not implemented.");
    }

    
    

}