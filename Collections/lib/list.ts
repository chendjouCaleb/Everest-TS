import { IList } from "./list.i";
import { IEnumerable } from "./i.enumerable";
import { NullArgumentException } from "./expection/null.argument.exception";
import { IEnumerator } from "./enumerator.i";
import { ArgumentOutOfRangeException } from "./expection/argument.out.of.range.exception";
import { Collection } from "./collection";

export class List<T> implements IList<T>{
    private _array: T[];
    private _size: number = 0;
    private static readonly s_empty_array: [] = [];
    public _version: number = 0;
    

    constructor(public collection?: IEnumerable<T>){
        this._array = [];

        if(!collection){
            
        }else{
            let en = collection.GetEnumerator();
            while (en.MoveNext()){
                this.Add(en.Current());
            }
            en.Reset();
        }
        
    }

    

    get Version(){
        return this._version;
    }

    get Size(){
        return this._size;
    }


    /**
     * Gets the element at the given index.
     * @param index 
     */
    Get(index: number): T {
        if(index < 0 || index >= this._size){
            throw new ArgumentOutOfRangeException();
        }
        return this._array[index];
    }
    
    /**
     * Sets the element at the given index.
     * @param index 
     * @param value 
     */
    Set(index: number, element: T){
        if(index < 0 || index >= this._size){
            throw new ArgumentOutOfRangeException();
        }

        this._array[index] = element;
        this._version++;
    }

    /**
     * Adds the given object to the end of this list. The size of the list is
     * increased by one
     * @param value 
     */
    Add(value: T): void {
        this._version++;
        this._array[this._size] = value;
        this._size++;
    }


    /**
     * Adds the elements of the given collection to the end of this list. If
     * required, the capacity of the list is increased to twice the previous
     * capacity or the new size, whichever is larger.
     * @param collection 
     */
    AddRange(collection: IEnumerable<T>){

    }


    IndexOf(item: T): void {
        throw new Error("Method not implemented.");
    }

    Insert(index: number, item: T): void {
        throw new Error("Method not implemented.");
    }
    RemoveAt(index: number): void {
        throw new Error("Method not implemented.");
    }
    Count(): number {
        return this._size;
    }
    IsReadOnly(): boolean {
        throw new Error("Method not implemented.");
    }
    
    /**
     * Clears the contents of List.
     */
    Clear(): void {
        this._version++;
        for(let i = 0; i < this._array.length; i++){
            this._array.shift();
        }
        this._size = 0;
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