/**
 * Base interface for all enumerators, providing a simple approach
 * to iterating over a collection.
 */
export interface IEnumerator<T> {
    /**
     * Advances the enumerator to the next element of the enumeration and
     * turns a boolean indicating whether an element is available. Upon
     * creation, an enumerator is conceptually positioned before the first
     * element of the enumeration, and the first call to MoveNext 
     * brings the first element of the enumeration into view.
     */

    MoveNext(): boolean;
    /**
     * Returns the current element of the enumeration. The returned value is
     * undefined before the first call to MoveNext and following a
     * call to MoveNext that returned false. Multiple calls to
     * GetCurrent with no intervening calls to MoveNext 
     * will return the same object.
    */

    Current(): T

    /**
     * Resets the enumerator to the beginning of the enumeration, starting over.
     * The preferred behavior for Reset is to return the exact same enumeration.
     * This means if you modify the underlying collection then call Reset, your
     * IEnumerator will be invalid, just as it would have been if you had called
     * MoveNext or Current.
    */
    Reset(): void;

    /**
     * Check that there are another item in the enumerator
     */
    HasMore(): boolean;

    /**
     * Returns the current element of the enumeration. The returned value is
     * undefined before the first call to MoveNext and following a
     * call to MoveNext that returned false. Multiple calls to
     * GetCurrent with no intervening calls to MoveNext 
     * will return the same object.
     * 
     */
    Current(): T;

}