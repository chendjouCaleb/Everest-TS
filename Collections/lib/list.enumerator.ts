import { IEnumerator } from "./enumerator.i";
import { IList } from "./list.i";
import { List } from "./list";
import { InvalidOperationException } from "./expection/invalid.operation.exception";
import { NullArgumentException } from "./expection/null.argument.exception";

export class ListEnumerator<T> implements IEnumerator<T> {
    private _index: number;
    private _version: number;
    constructor(private readonly _list: List<T>){
        if(_list == null){
            throw new NullArgumentException("Enumerator cannot be create with null argument");
        }
        this._index = -1;
        this._version = 0;
    }


    MoveNext(): boolean {

        if(this._index < this._list.Size){
            this._index++;
            return this._index < this._list.Size;
        }

        return false;
    }    
    
    
    Current(): T {
        if(this._index < 0){
            throw new InvalidOperationException("The enumerator is not started. Call MoveNext() to start it");
        }

        if(this._index > this._list.Size){
            throw new InvalidOperationException("The enumerator has already reached the last element of collection")
        }

        return this._list.Get(this._index);
    }
    
    Reset(): void {
        this._index = -1;
    }

    HasMore(): boolean {
        return this._index < this._list.Size
    }

    

    MoveNextRare(){
        if(this._version != this._list.Version){
            throw new InvalidOperationException("Enumerator version is different from the list version");
        }
        
        this._index = this._list.Count() + 1;
        return false;
    }
}