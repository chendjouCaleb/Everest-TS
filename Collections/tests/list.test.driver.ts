import { List } from "../lib/list/list";
import { ArgumentOutOfRangeException } from "../lib/expection/argument.out.of.range.exception";
import { IList } from "../lib/list/list.interface";
import { IEnumerable } from "../lib/enumerable.interface";
import { ListEnumerator } from "../lib/list/list.enumerator";
import { ArrayEnumerator } from "../lib/array.enumerator";

export class Driver<T>
{
    
    BasicInsert<T>(items: T[], item:T, index: number, repeat: number)
    {
        let list = List.fromArray<T>(items);

        for (let i = 0; i < repeat; i++)
        {
            list.insert(index, item);
        }

        expect(list.contains(item)).toBeTruthy() //"Expect it to contain the item."
        expect(list.count()).toBe(items.length + repeat); //"Expect to be the same."


        for (let i = 0; i < index; i++)
        {
            expect(list.get(i)).toBe(items[i]); //"Expect to be the same."
        }

        for (let i = index; i < index + repeat; i++)
        {
            expect(list.get(i)).toBe(item); //"Expect to be the same."
        }


        for (let i = index + repeat; i < list.count(); i++)
        {
            expect(list.get(i)).toBe(items[i - repeat]); //"Expect to be the same."
        }
    }

    public InsertValidations(items: T[]): void
    {
        let list = List.fromArray<T>(items);
        
        let bad:number[] = [items.length + 1, items.length + 2, Number.MAX_VALUE, -1, -2, Number.MIN_VALUE ];
        for (let i = 0; i < bad.length; i++)
        {
            expect(list.insert(bad[i], items[0])).toThrowError(ArgumentOutOfRangeException);
            //"ArgumentOutOfRangeException expected."
        }
    }



    public InsertRangeIEnumerable(itemsX: T[] , itemsY: T[] , index: number, repeat: number, enumFn: (items: T[]) => IEnumerable<T>): void
    {
        let list = new List<T>(enumFn(itemsX));

        for (let i = 0; i < repeat; i++)
        {
            list.insertRange(index, enumFn(itemsY));
        }

        for (let item of itemsY)
        {
            expect(list.contains(item)).toBeTruthy(); //"Should contain the item."
        }
        expect(list.count()).toBe(itemsX.length + (itemsY.length * repeat)); //"Should have the same result."

        for (let i = 0; i < index; i++)
        {
            expect(list.get(i)).toBe(itemsX[i]); //"Should have the same result."
        }

        for (let i = index; i < index + (itemsY.length * repeat); i++)
        {
            expect(list.get(i)).toBe(itemsY[(i - index) % itemsY.length]); //"Should have the same result."
        }

        for (let i = index + (itemsY.length * repeat); i < list.count(); i++)
        {
            expect(list.get(i)).toBe(itemsX[i - (itemsY.length * repeat)]); //"Should have the same result."
        }

        //insertRange into itself
        list = new List<T>(enumFn(itemsX));
        list.insertRange(index, list);

        for (let item of itemsX)
        {
            expect(list.contains(item)).toBeTruthy(); //"Should contain the item."
        }
        expect(list.count()).toBe(itemsX.length + (itemsX.length)); //"Should have the same result."

        for (let i = 0; i < index; i++)
        {
            expect(list.get(i)).toBe(itemsX[i]); //"Should have the same result."
        }

        for (let i = index; i < index + (itemsX.length); i++)
        {
            expect(list.get(i)).toBe(itemsX[(i - index) % itemsX.length]); //"Should have the same result."
        }

        for (let i = index + (itemsX.length); i < list.count(); i++)
        {
            expect(list.get(i)).toBe(itemsX[i - (itemsX.length)]); //"Should have the same result."
        }
    }


    public InsertRangeValidations(items: T[], enumFn: (items: T[]) => IEnumerable<T>):void
    {
        let list = new List<T>(enumFn(items));
        let bad: number[] = [items.length + 1, items.length + 2, Number.MAX_VALUE, -1, -2, Number.MIN_VALUE];
        for (let i = 0; i < bad.length; i++)
        {
            expect(list.insertRange(bad[i], enumFn(items))).toThrowError(ArgumentOutOfRangeException);
             //"ArgumentOutOfRangeException expected"
        }
    }

    public ConstructTestEnumerable = (items: T[]) => new ArrayEnumerator(items);
    

    //public IEnumerable<T> ConstructLazyTestEnumerable(T[] items)
    //{
    //    return ConstructTestEnumerable(items)
    //        .Select(item => item);
    //}

    public ConstructTestList = (items:T[]) => List.fromArray(items);
    

    //endregion

    //egion getRange

    public BasicGetRange(items: T[], index: number, count: number):void 
    {
        let list = List.fromArray(items);
        let range = list.getRange(index, count);

        //ensure range is good
        for (let i = 0; i < count; i++)
        {
            expect(range.get(i)).toBe(items[i + index]); //String.Format("Err_170178aqhbpa Expected item: {0} at: {1} actual: {2}", items[i + index], i, range[i])
        }

        //ensure no side effects
        for (let i = 0; i < items.length; i++)
        {
            expect(list.get(i)).toBe(items[i]); //String.Format("Err_00125698ahpap Expected item: {0} at: {1} actual: {2}", items[i], i, list[i])
        }
    }

    public EnsureRangeIsReference(items: T[] , item: T, index: number, count: number): void
    {
        let list = List.fromArray(items);
        let range = list.getRange(index, count);
        let tempItem = list.get(index);
        range.set(0, item);
        expect(list.get(index)).toBe(tempItem); //String.Format("Err_707811hapba Expected item: {0} at: {1} actual: {2}", tempItem, index, list[index])
    }

    public EnsureThrowsAfterModification(items: T[] , item: T, index: number, count:number):void
    {
        let list = List.fromArray(items);
        let range = list.getRange(index, count);
        let tempItem = list.get(index);
        range.set(index, item);

        expect(range.get(0)).toBe(tempItem); //String.Format("Err_1221589ajpa Expected item: {0} at: {1} actual: {2}", tempItem, 0, range[0])
    }

    public GetRangeValidations(items: T[]): void
    {
        //
        //Always send items.Length is even
        //
        let list = List.fromArray(items);
        let bad: number[] = [  /**/items.length,1,
            /**/
                            items.length+1,0,
            /**/
                            items.length+1,1,
            /**/
                            items.length,2,
            /**/
                            items.length/2,items.length/2+1,
            /**/
                            items.length-1,2,
            /**/
                            items.length-2,3,
            /**/
                            1,items.length,
            /**/
                            0,items.length+1,
            /**/
                            1,items.length+1,
            /**/
                            2,items.length,
            /**/
                            items.length/2+1,items.length/2,
            /**/
                            2,items.length-1,
            /**/
                            3,items.length-2
        ];

        for (let i = 0; i < bad.length; i++)
        {
            expect(list.getRange(bad[i], bad[++i])).toThrowError(ArgumentOutOfRangeException);; //"ArgumentException expected."
        }

        bad = [
            /**/
                            -1,-1,
            /**/
                            -1,0,
            /**/
                            -1,1,
            /**/
                            -1,2,
            /**/
                            0,-1,
            /**/
                            1,-1,
            /**/
                            2,-1
        ];

        for (let i = 0; i < bad.length; i++)
        {
            expect(list.getRange(bad[i], bad[++i])).toThrowError(ArgumentOutOfRangeException); //"ArgumentOutOfRangeException expected."
        }
    }

    //endregion

    //region exists(Pred<T>)

    public Exists_Verify(items: T[])
    {
        this.Exists_VerifyVanilla(items);
        this.Exists_VerifyDuplicates(items);
    }

    

    public Exists_VerifyExceptions(items: T[])
    {
        let list = new List<T>();
        let predicate = (item: T) => { return true; };

        for (let i = 0; i < items.length; ++i)
            list.add(items[i]);

        //[] Verify Null match
        // expect(list.exists(null)).toThrowError(ArgumentNullException); //"Err_858ahia Expected null match to throw ArgumentNullException"
    }

    private Exists_VerifyVanilla(items: T[]): void
    {
        let list = new List<T>();
        let expectedItem: T | null = null;
        let expectedItemFn = (item: T) => { return expectedItem == null ? item == null : expectedItem === item };
        //bool typeNullable = default(T) == null;

        for (let i = 0; i < items.length; ++i)
            list.add(items[i]);

        //[] Verify exists returns the correct index
        for (let i = 0; i < items.length; ++i)
        {
            expectedItem = items[i];

            expect(list.exists(expectedItemFn)).toBeTruthy()
                //"Err_282308ahid Verifying Nullable returned FAILED\n");
        }

        //[] Verify exists returns true if the match returns true on every item
        expect(( items.length > 0) == list.exists(item => true )).toBeTruthy();
        //"Err_548ahid Verify exists returns 0 if the match returns true on every item FAILED\n");

        //[] Verify exists returns false if the match returns false on every item
        expect(list.exists(item => false)).toBeFalsy();
        //"Err_30848ahidi Verify exists returns -1 if the match returns false on every item FAILED\n");

    }

    private Exists_VerifyDuplicates(items: T[]): void
    {
        let expectedItem: T;
        let list = new List<T>();
        let expectedItemFn = (item: T) => { return expectedItem == null ? item == null : expectedItem == item; };

        if (items.length > 0)
        {
            for (let i = 0; i < items.length; ++i)
                list.add(items[i]);

            for (let i = 0; i < items.length && i < 2; ++i)
                list.add(items[i]);

            //[] Verify first item is duplicated
            expectedItem = items[0];
            expect(list.exists(expectedItemFn)).toBeTruthy();
            //"Err_2879072qaiadf  Verify first item is duplicated FAILED\n");
        }

        if (1 < items.length)
        {
            //[] Verify second item is duplicated
            expectedItem = items[1];
            expect(list.exists(expectedItemFn)).toBeTruthy();
            //"Err_4588ajdia Verify second item is duplicated FAILED\n");

            //[] Verify with match that matches more then one item
            expect(list.exists(item  => { return item != null && (item === (items[0]) || item === (items[1])) })).toBeTruthy();
            // "Err_4489ajodoi Verify with match that matches more then one item FAILED\n");
        }
    }

    //endregion

    //region contains

    public BasicContains(items: T[]): void
    {
        let list = List.fromArray(items);

        for (let i = 0; i < items.length; i++)
        {
            expect(list.contains(items[i])).toBeTruthy(); //"Should contain item."
        }
    }

    public NonExistingValues(itemsX: T[], itemsY: T[])
    {
        let list = List.fromArray(itemsX);

        for (let i = 0; i < itemsY.length; i++)
        {
            expect(list.contains(itemsY[i])).toBeFalsy(); //"Should not contain item"
        }
    }

    public RemovedValues(items: T[])
    {
        let list = List.fromArray(items);
        for (let i = 0; i < items.length; i++)
        {
            list.remove(items[i]);
            expect(list.contains(items[i])).toBeFalsy(); //"Should not contain item"
        }
    }

    public AddRemoveValues(items: T[])
    {
        let list = List.fromArray(items);
        for (let i = 0; i < items.length; i++)
        {
            list.add(items[i]);
            list.remove(items[i]);
            list.add(items[i]);
            expect(list.contains(items[i])).toBeTruthy() //"Should contain item."
        }
    }

    public MultipleValues(items: T[], times: number)
    {
        let list = List.fromArray(items);
        for (let i = 0; i < times; i++)
        {
            list.add(items[items.length / 2]);
        }

        for (let i = 0; i < times + 1; i++)
        {
            expect(list.contains(items[items.length / 2])).toBeTruthy(); //"Should contain item."
            list.remove(items[items.length / 2]);
        }
        expect(list.contains(items[items.length / 2])).toBeFalsy(); //"Should not contain item"
    }
    public ContainsNullWhenReference(items: T[], value: T)
    {
        //if ((object)value != null)
        //{
        //    throw new ArgumentException("invalid argument passed to testcase");
        //}

        //List<T> list = new List<T>(items);
        //list.add(value);
        //Assert.True(list.contains(value)); //"Should contain item."
    }

    
    //endregion

    //region clear

    public ClearEmptyList()
    {
        let list = new List<T>();
        expect(list.count()).toBe(0); //"Should be equal to 0"
        list.clear();
        expect(list.count()).toBe(0); //"Should be equal to 0."
    }
    public ClearMultipleTimesEmptyList(times: number)
    {
        let list = new List<T>();
        expect(list.count()).toBe(0); //"Should be equal to 0."
        for (let i = 0; i < times; i++)
        {
            list.clear();
            expect(list.count()).toBe(0); //"Should be equal to 0."
        }
    }

    public ClearNonEmptyList(items: T[])
    {
        let list = List.fromArray(items);
        list.clear();
        expect(list.count()).toBe(0); //"Should be equal to 0."
    }

    public ClearMultipleTimesNonEmptyList(items: T[], times: number)
    {
        let list = List.fromArray(items);
        for (let i = 0; i < times; i++)
        {
            list.clear();
            expect(list.count()).toBe(0); //"Should be equal to 0."
        }
    }


    //endregion

    //region trueForAll

    public TrueForAll_VerifyVanilla(items: T[])
    {
        let expectedItem: T | null = null;
        let list = new List<T>();
        let expectedItemDelegate = (item: T) => { return expectedItem == null ? item != null : false };
        let typeNullable = null;

        for (let i = 0; i < items.length; ++i)
            list.add(items[i]);

        //[] Verify trueForAll looks at every item
        for (let i = 0; i < items.length; ++i)
        {
            expectedItem = items[i];
            expect(list.trueForAll(expectedItemDelegate)).toBeFalsy(); //"Err_282308ahid Verify trueForAll looks at every item FAILED\n"
        }

        //[] Verify trueForAll returns true if the match returns true on every item
        expect(list.trueForAll(item => true)).toBeTruthy();
        //"Err_548ahid Verify trueForAll returns true if the match returns true on every item FAILED\n");

        //[] Verify trueForAll returns false if the match returns false on every item
        expect((0 == items.length) == list.trueForAll(item => false )).toBeTruthy();
        //"Err_30848ahidi Verify trueForAll returns " + (0 == items.length) + " if the match returns false on every item FAILED\n");
    }

    public TrueForAll_VerifyExceptions(items: T[])
    {
        let list = new List<T>();
        let predicate =  (item: T) =>  true; 
        for (let i = 0; i < items.length; ++i)
            list.add(items[i]);

        //[] Verify Null match
        //Assert.Throws<ArgumentNullException>(() => list.trueForAll(null)); //"Err_858ahia Expected null match to throw ArgumentNullException"
    }

    //endregion

    //region toArray

    public BasicToArray(items:T[])
    {
        let list = List.fromArray(items);

        let arr = list.toArray();

        for (let i = 0; i < items.length; i++)
        {
           expect(arr[i]).toBe(items[i]); //"Should be equal."
        }
    }

    public EnsureNotUnderlyingToArray(items:T[], item: T)
    {
        let list = List.fromArray(items);
        
        let arr = list.toArray();

        list.set(0, item);
        if (arr[0] == null)
            expect(list.get(0)).toBeTruthy(); //"Should NOT be null"
        else
            expect(arr[0]).toBe(list.get(0)); //"Should NOT be equal."
    }

    //endregion
}

export function NumberList(length: number){
    let numbers: number[] = [];

    for(let i = 0; i < length; i++){
        numbers[i] = i;
    }
    return List.fromArray(numbers);
}