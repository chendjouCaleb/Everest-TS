import { IList } from "./list.i";
import { IEnumerable } from "./i.enumerable";
import { NullArgumentException } from "./expection/null.argument.exception";
import { IEnumerator } from "./enumerator.i";
import { ArgumentOutOfRangeException } from "./expection/argument.out.of.range.exception";
import { Collection } from "./collection";
import { ListEnumerator } from "./list.enumerator";
import { uint } from "./utils";

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


    /**
     * Returns the index of the first occurrence of a given value in a range of
     * this list. The list is searched forwards from beginning to end.
     * The elements of the list are compared to the given value using the
     * Object.Equals method. This method uses the Array.IndexOf method to perform the search.
     */
    IndexOf(item: T, index = 0, count?:number): number {
        if(!count){
            count = this._size;
        }

        if(index < 0 || index > this._size){
            throw new ArgumentOutOfRangeException();
        }

        if(count < 0 || index > this._size - count){
            throw new ArgumentOutOfRangeException();
        }

        
        
        return this._array.slice(index, index+count).indexOf(item, index);
    }


    /** 
     * Inserts an element into this list at a given index. The size of the list
     * is increased by one. If required, the capacity of the list is doubled
     * before inserting the new element.
     */
    Insert(index: number, item: T): void {
        if(uint(index) > this._size){
            throw new ArgumentOutOfRangeException();
        }
        let temp: T[] = [];
        this.CopyTo(temp, index);
        this._array[index] = item;

        for(let i = 0; i < temp.length; i++){
            this._array[index + i + 1] = temp[i];
        } 

        this._version++;
        this._size++;
    }

    /**
     * Inserts the elements of the given collection at a given index. If
     * required, the capacity of the list is increased to twice the previous
     * capacity or the new size, whichever is larger.  Ranges may be added
     * to the end of the list by setting index to the List's size.
     * @param index 
     * @param collection 
     */
    InsertRange(index: number, collection: IEnumerable<T>){
        if(collection == null){
            throw new NullArgumentException("The collection argument is null");
        }

        if(uint(index) > uint(this._size)){
            throw new ArgumentOutOfRangeException();
        }

        let temp: T[] = [];
        this.CopyTo(temp, index);

        let enumerator = collection.GetEnumerator();
        let i = index;
        while(enumerator.MoveNext()){
            this._array[i] = enumerator.Current();
            i++;
            this._version++;
            this._size++;
        }
        for(let i = 0; i < temp.length; i++){
            this._array[index + i + 1] = temp[i];
        } 
    }

    /**
     * Returns the index of the last occurrence of a given value in a range of
     * this list. The list is searched backwards, starting at index
     * index and upto count elements. The elements of
     * the list are compared to the given value using the Object.Equals method.

     * This method uses the Array.LastIndexOf method to perform the search.

     * @param item 
     * @param index 
     * @param count 
     */
    LastIndexOf(item: T, index = 0, count = this._size){
        
        if(index < 0 || count < 0){
            throw new ArgumentOutOfRangeException("You cannot require a negative index of list");
        }

        if(this._size == 0){
            return -1;
        }

        if(index >= this._size){
            throw new ArgumentOutOfRangeException("The required index is greater or equals than the list size");
        }

        if(index + count > this._size){
            throw new ArgumentOutOfRangeException("The index + count is greater or equals than the list size");
        }

        return this._array.lastIndexOf(item, index + count);
    }

    /**
     * Removes the element at the given index. The size of the list is
     * decreased by one.
     * @param item  item to remove
     * @returns true if the item has found and removed
     */
    Remove(item: T): boolean {
        if(item == null){
            throw new NullArgumentException("Cannot remove null value from list");
        }

        let index = this.IndexOf(item);
        if(index >= 0){
            this.RemoveAt(index);
            return true;
        }
        return false;
    }


    /**
     * Removes the element at the given index. The size of the list is
     * decreased by one.
     * @param index 
     */
    RemoveAt(index: number): void {
        if(uint(index) >= uint(this._size)){
            throw new ArgumentOutOfRangeException();
        }

        for(let i = index; i < this._array.length - 1; i++){
            this._array[index + i] = this._array[index + i + 1];
        }
        this._size--;
        this._array.pop();
        this._version++;
    }

    /**
     * Removes a range of elements from this list.
     * @param index Starting index 
     * @param count Number of items to remove
     */
    RemoveRange(index: number, count: number): void{
        if(index < 0){
            throw new ArgumentOutOfRangeException("The index must not be a negative number");
        }

        if(count < 0){
            throw new ArgumentOutOfRangeException("The count argument must not be a negative number");
        }

        if(index + count > this._size){
            throw new ArgumentOutOfRangeException("The index + count is greater or equals than the list size");
        }

        //for(let i = index; i+count < this._array.length; i++){
        //    this._array[i] = this._array[i + count];
        //}
        // for(let i = 0; i+count < count; i++){
        //    this._array[i] = this._array[i + count];
        //    this._size--;
        //    this._array.pop();
        // }

        this._array.splice(index, count);
        this._size -= count;
        this._version++;
    }

    Reverse(): void{
        this._array.reverse();
        this._version++;
    }

    /**
     * Reverses the elements in a range of this list. Following a call to this
     * method, an element in the range given by start and count
     * which was previously located at index i will now be located at
     * index index + (index + count - i - 1).
     * @param start 
     * @param count 
     */
    ReverseRange(start: number, count: number): void{
        if(start < 0){
            throw new ArgumentOutOfRangeException("The index must not be a negative number");
        }

        if(count < 0){
            throw new ArgumentOutOfRangeException("The count argument must not be a negative number");
        }

        if(start + count > this._size){
            throw new ArgumentOutOfRangeException("The index + count is greater or equals than the list size");
        }


        let rangeToReverse = this._array.slice(start, start + count);
        let remainingArray = this._array.slice(start + count+1);
        this._array.splice(start);

        this._array = this._array
        .concat(rangeToReverse.reverse())
        .concat(remainingArray);

        this._version++;
    }

    /**
     * Sorts the elements in this list.  Uses Array.Sort with the
     * provided comparer. function
     * @param compareFn The comparer function
     * @default compareFn The default ASCII character comparer
     */
    Sort(compareFn?: (a: T, b: T) => number): void{
        this._array.sort(compareFn);
        this._version++;
    }

    /**
     * Sorts the elements in a given range of a list.  Uses Array.Sort with the
     * provided comparer. function
     * @param compareFn The comparer function
     * @default compareFn The default ASCII character comparer
     * @param start first index of a range
     * @param count Number of element to include in a range
     */
    SortRange(start: number, count: number, compareFn?: (a: T, b: T) => number): void{

        if(start < 0){
            throw new ArgumentOutOfRangeException("The index must not be a negative number");
        }

        if(count < 0){
            throw new ArgumentOutOfRangeException("The count argument must not be a negative number");
        }

        if(start + count > this._size){
            throw new ArgumentOutOfRangeException("The index + count is greater or equals than the list size");
        }

        let rangeToSort = this._array.slice(start, start + count);
        let remainingArray = this._array.slice(start + count+1);
        this._array.splice(start);

        this._array = this._array
        .concat(rangeToSort.sort(compareFn))
        .concat(remainingArray);

        this._version++;
    }


    /**
     * Convert all element in the list to the Toutput type
     * @param converterFn The converter function
     */
    public ConvertAll<TOutput>(converterFn:(item:T) => TOutput): List<TOutput> {
        if(converterFn == null){
            throw new NullArgumentException("The converter function must be a non null.");
        }

        let output = new List<TOutput>();
        for(let i = 0; i < this._array.length; i++){
            output._array[i] = converterFn(this._array[i]);
        }
        output._size = this._size;

        return output;
    }


    /**
     * Find and return the first item that match the given function
     * @param matcherFn The matcher function
     */
    public Find(matcherFn:(item: T) => boolean): T | null {
        if(matcherFn == null){
            throw new NullArgumentException("The matcher function must be a non null.");
        }
        for(let i = 0; i < this._array.length; i++){
            if(matcherFn(this._array[i])){
                return this._array[i];
            }
        }
        return null;
    }
    

     /**
     * Find and return a list that contains all item that match the given function
     * @param matcherFn The matcher function
     */
    public FindAll(matcherFn:(item: T) => boolean): List<T> {
        if(matcherFn == null){
            throw new NullArgumentException("The matcher function must be a non null.");
        }

        let list = new List<T>();
        for(let i = 0; i < this._array.length; i++){
            if(matcherFn(this._array[i])){
                list.Add(this._array[i]);
            }
        }
        return list;
    }

    /**
     * Find the index of a first item that match the given function.  
     * @param compareFn The comparer function
     * @default compareFn The default ASCII character comparer
     * @param start first index of a range
     * @param count Number of element to include in a range
     */
    public FindIndex(startIndex: number = 0, count: number = this._size, matcherFn: (item: T) => boolean): number
    {
            if(startIndex < 0){
                throw new ArgumentOutOfRangeException("The index must not be a negative number");
            }
    
            if(count < 0){
                throw new ArgumentOutOfRangeException("The count argument must not be a negative number");
            }
    
            if(startIndex + count > this._size){
                throw new ArgumentOutOfRangeException("The startIndex + count is greater or equals than the list size");
            }

            if(matcherFn == null){
                throw new NullArgumentException("The matcher function must be a non null.");
            }

            let endIndex = startIndex + count;
            for (let i = startIndex; i < endIndex; i++)
            {
                if (matcherFn(this._array[i])) return i;
            }
            return -1;
    }


    /**
     * Find and return the last item that match the given function
     * @param matcherFn The matcher function
     */
    public FindLast(matcherFn: (item: T) => boolean):T | null
    {
        if(matcherFn == null){
            throw new NullArgumentException("The matcher function must be a non null.");
        }

        for (let i = this._size - 1; i >= 0; i--)
        {
            if (matcherFn(this._array[i]))
            {
                return this._array[i];
            }
        }
        return null;
    }

    public FindLastIndex(startIndex: number, count:number, matcherFn: (item: T) => boolean): number
    {
        if(matcherFn == null){
            throw new NullArgumentException("The matcher function must be a non null.");
        }

        if (this._size == 0)
        {
            // Special case for 0 length List
            if (startIndex != -1)
            {
                throw new ArgumentOutOfRangeException();
            }
        }
        else
        {
            // Make sure we're not out of range
            if (uint(startIndex) >= uint(this._size))
            {
                throw new ArgumentOutOfRangeException();
            }
        }

        // 2nd have of this also catches when startIndex == MAXINT, so MAXINT - 0 + 1 == -1, which is < 0.
        if (count < 0 || startIndex - count + 1 < 0)
        {
            throw new ArgumentOutOfRangeException();
        }

        let endIndex = startIndex - count;
        for (let i = startIndex; i > endIndex; i--)
        {
            if (matcherFn(this._array[i]))
            {
                return i;
            }
        }
        return -1;
    }
    
    public ForEach(callbackFn: (item: T, index: number) => void){
        if(callbackFn == null){
            throw new NullArgumentException("The callback function must be a non null.");
        }

        let version = this._version;
        for (let i = 0; i < this._size; i++)
        {
            // Don't edit list during the loop
            
            if (version != this._version)
            {
                break;
            }
            callbackFn(this._array[i], i);
        }
    }


    /**
     * Check that the given function matchs all the item of the list
     * @param matcherFn 
     */
    public TrueForAll(matcherFn: (item: T) => boolean): boolean
    {
        if(matcherFn == null){
            throw new NullArgumentException("The matcher function must be a non null.");
        }

        for (let i = 0; i < this._size; i++)
        {
            if (!matcherFn(this._array[i]))
            {
                return false;
            }
        }
        return true;
    }

    /**
     * This method removes all items which matches the predicate.
     * @param matcherFn
     */
    public RemoveAll(matcherFn: (item: T) => boolean): number {
        if(matcherFn == null){
            throw new NullArgumentException("The matcher function must be a non null.");
        }

        let freeIndex = 0;

        // Find the first item which needs to be removed.
        while (freeIndex < this._size && !matcherFn(this._array[freeIndex])) freeIndex++;
        if (freeIndex >= this._size) return 0;

        let current = freeIndex + 1;

        while (current < this._size)
        {
            // Find the first item which needs to be kept.
            while (current < this._size && matcherFn(this._array[current])) current++;

            if (current < this._size)
            {
                // copy item to the free slot.
                this._array[freeIndex++] = this._array[current++];
            }
        }

        // Clear the elements so that the gc can reclaim the references.
        for(let i = this._size - 1; i > this._size - freeIndex; i--){
            this._array.pop();
        }

        let result = this._size - freeIndex;
        this._size = freeIndex;
        this._version++;
        return result;
    }


    Count(): number {
        return this._size;
    }
    IsReadOnly(): boolean {
        return false;
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


    /**
     * Contains returns true if the specified element is in the List.
     */
    Contains(item: T): boolean {
        return this._size != 0 && this.IndexOf(item) > -1;
    }


    /**
     * Copy all items of the list into a array
     * @param array Array that must receive the items of the list
     * @param startingIndex 
     */
    CopyTo(array: T[], startingIndex = 0): void {
        if(!array){
            throw new NullArgumentException("The copy require a non null array");
        }
        for(let i = startingIndex, j = 0; i < this._size; i++, j++){
            array[i] = this.Get(j);
        }
    }

    /**
     * Returns an enumerator for this list with the given
     * permission for removal of elements. If modifications made to the list 
     * while an enumeration is in progress, the MoveNext and 
     * GetObject methods of the enumerator will throw an exception.
     */
    GetEnumerator(): IEnumerator<T> {
        return new ListEnumerator(this);
    }


    public GetRange(index: number, count: number){
        if(index < 0){
            throw new ArgumentOutOfRangeException();
        }

        if(count < 0){
            throw new ArgumentOutOfRangeException("The cannot required a negative number of items");
        }

        if(this._size - index < count){
            throw new ArgumentOutOfRangeException("The list don't have the number of items that your require after the index");
        }

        let copy = new List<T>();

        for(let i = index; i < count; i++){
            copy.Add(this.Get(i));
        }
    }


    
    /**
     * ToArray returns an array containing the contents of the List.
     * This requires copying the List
     * @returns An array that contains all items of a list
     */
    ToArray(): T[] {
        let copy: T[] = [];
        return copy.concat(this._array);
    }
}