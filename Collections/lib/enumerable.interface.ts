import { IEnumerator } from "./enumerator.interface";

export interface IEnumerable<T>{
    /**
     * Returns an IEnumerator for this enumerable Object.  The enumerator provides
     * a simple way to access all the contents of a collection.
     */
    getEnumerator() : IEnumerator<T>;
}



