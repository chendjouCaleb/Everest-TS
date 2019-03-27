import { ICollection } from "./collections.interface";
import {IEnumerator} from "./enumerator.interface";

export class Collection<T> implements ICollection<T>{
    private length: number = 0;
    count(): number{
        return this.length;
    }    
    
    isReadOnly(): boolean{
        return false;
    }

    add(value: T): void {
        throw new Error("Method not implemented.");
    }

    clear(): void {
        throw new Error("Method not implemented.");
    }

    copyTo(array: T[], startingIndex: number): void {
        throw new Error("Method not implemented.");
    }

    toArray(): T[] {
        throw new Error("Method not implemented.");
    }

    item(): T {
        throw new Error("Method not implemented.");
    }

    contains(item: T): boolean {
        return false;
    }

    getEnumerator(): IEnumerator<T> {
        throw new Error();
    }

    remove(item: T): boolean {
        return false;
    }

    

}