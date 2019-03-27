import {IEnumerator} from "./enumerator.interface";

export class EnumeratorIterator<T> implements EnumeratorIterator<T>{
    constructor(private enumerator: IEnumerator<T>){ }

    next(): IteratorResult<any> {
        if(this.enumerator.hasMore()){
            this.enumerator.moveNext();
            return { done: false, value: this.enumerator.current()}
        }
        return { done: true, value : null };
    }
}