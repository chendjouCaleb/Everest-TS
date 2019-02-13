import { IEnumerator } from "./enumerator.i";

export interface IEnumerable<T>{
    /**
     * Returns an IEnumerator for this enumerable Object.  The enumerator provides
     * a simple way to access all the contents of a collection.
     */
    GetEnumerator() : IEnumerator<T>;
}



