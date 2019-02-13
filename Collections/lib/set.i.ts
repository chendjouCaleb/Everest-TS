import { IEnumerable } from "./i.enumerable";

export interface ISet<T>{
    /**
     * Add ITEM to the set, return true if added, false if duplicate
    */
   Add(item: T): boolean;

   /**
    * Add ITEM to the set.
    * throw a new DuplicationException if duplicate
   */
  TryAdd(item: T): void;

   /**
    * Transform this set into its union with the other: IEnumerable<T>
    * @param other Other IEnumerable for the union
    */
    UnionWith(other: IEnumerable<T>): void;


    /**
     * Transform this set into its intersection with the other: IEnumerable<T>
     */
    IntersectWith(other:IEnumerable<T>):void ;

    /**
     * Transform this set so it contains no elements that are also in other
     */
    ExceptWith(other: IEnumerable<T>): void;

    /**
     * Transform this set so it contains elements initially in this or in other, but not both
     * @param other 
     */
    SymmetricExceptWith(other: IEnumerable<T>): void ;

    /**
     * Check if this set is a subset of other
     * @param other 
     */
    IsSubsetOf(other: IEnumerable<T>): boolean;

    /**
     * Check if this set is a superset of other
     * @param other 
     */
    IsSupersetOf(other: IEnumerable<T>): boolean;

    /**
     * Check if this set is a subset of other, but not the same as it
     * @param other 
     */
    IsProperSupersetOf(other: IEnumerable<T>): boolean;

    /**
     * Check if this set is a superset of other, but not the same as it
     * @param other 
     */
    IsProperSubsetOf(other: IEnumerable<T>): boolean;

    /**
     * Check if this set has any elements in common with other
     * @param other 
     */
    Overlaps(other: IEnumerable<T>): boolean;

    /**
     * Check if this set contains the same and only the same elements as other
     * @param other 
     */
    SetEquals(other: IEnumerable<T>): boolean;
    
}