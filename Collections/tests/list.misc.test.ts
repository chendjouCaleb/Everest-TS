import { List } from "../lib/list/list";
import { Driver } from "./list.test.driver";
import { ArgumentOutOfRangeException } from "../lib/expection/argument.out.of.range.exception";



test("basic insertions", () =>
        {
            let numbers = new List<number>();
            for(let i = 0; i < 10; i++){
                numbers.insert(i, i * 10);
            }

            expect(numbers.size).toBe(10);

            for(let i = 0; i < 10; i++){
                expect(numbers.get(i)).toBe(i * 10);
            }


            numbers = List.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

            for(let i = 10; i < 20; i++){
                numbers.insert(i, i);
            }

            expect(numbers.size).toBe(20);

            for(let i = 0; i < 20; i++){
                expect(numbers.get(i)).toBe(i);
            }



           let IntDriver = new Driver<number>();
            let intArr1: number[] = [];
            for (let i = 0; i < 100; i++)
                intArr1[i] = i;

                
            let intArr2: number[] = [];
            for (let i = 0; i < 100; i++)
                intArr2[i] = i;

            IntDriver.BasicInsert([0], 1, 0, 3);
            IntDriver.BasicInsert(intArr1, 101, 50, 4);
            IntDriver.BasicInsert(intArr1, 100, 100, 5);
            IntDriver.BasicInsert(intArr1, 100, 99, 6);
            IntDriver.BasicInsert(intArr1, 50, 0, 7);
            IntDriver.BasicInsert(intArr1, 50, 1, 8);
            IntDriver.BasicInsert(intArr1, 100, 50, 50);


            let StringDriver = new Driver<string>();
            let stringArr1 : string[]= [];
            for (let i = 0; i < 100; i++)
                stringArr1[i] = "SomeTestString" + i.toString();

            let stringArr2 : string[]= [];
            for (let i = 0; i < 100; i++)
                stringArr2[i] = "SomeTestString" + i.toString();

            StringDriver.BasicInsert(stringArr1, "strobia", 99, 2);
            StringDriver.BasicInsert(stringArr1, "strobia", 100, 3);
            StringDriver.BasicInsert(stringArr1, "strobia", 0, 4);
            StringDriver.BasicInsert(stringArr1, "strobia", 1, 5);
            StringDriver.BasicInsert(stringArr1, "strobia", 50, 51);
            StringDriver.BasicInsert(stringArr1, "strobia", 0, 100); 
        }
)


test("InsertRangeTests", () => {
    let intArr1:number[] = [];
    for (let i = 0; i < 100; i++)
        intArr1[i] = i;

    let intArr2:number[] = [];
    for (let i = 0; i < 10; i++)
    {
        intArr2[i] = i + 100;
    }

    let list1 = List.fromArray(intArr1);
    let list2 = List.fromArray(intArr2);

    list1.insertRange(10, list2);

    expect(list1.size).toBe(100+10);
    expect(list1.version).toBe(100+10);

    for(let i = 0; i < 10; i++){
        expect(list1.get(i)).toBe(intArr1[i]);
    }

    // Stop counter to index+list2.size
    for(let i = 10; i < 20; i++){
        expect(list1.get(i)).toBe(list2.get(i-10));
    }

    for(let i = 20; i < list1.size; i++){
        expect(list1.get(i)).toBe(intArr1[i-10]);
    }
})

test("GetRangeTests", () => {
    let IntDriver = new Driver<number>();
    let intArr1:number[] = [];
    for (let i = 0; i < 100; i++)
        intArr1[i] = i;

    IntDriver.BasicGetRange(intArr1, 50, 50);
    IntDriver.BasicGetRange(intArr1, 0, 50);
    IntDriver.BasicGetRange(intArr1, 50, 25);
    IntDriver.BasicGetRange(intArr1, 0, 25);
    IntDriver.BasicGetRange(intArr1, 75, 25);
    IntDriver.BasicGetRange(intArr1, 0, 100);
    IntDriver.BasicGetRange(intArr1, 0, 99);
    IntDriver.BasicGetRange(intArr1, 1, 1);
    IntDriver.BasicGetRange(intArr1, 99, 1);
    IntDriver.EnsureRangeIsReference(intArr1, 101, 0, 10);
    IntDriver.EnsureThrowsAfterModification(intArr1, 10, 10, 10);

    let StringDriver = new Driver<string>();
    let stringArr1:string[] = [];
    for (let i = 0; i < 100; i++)
        stringArr1[i] = "SomeTestString" + i.toString();

    StringDriver.BasicGetRange(stringArr1, 50, 50);
    StringDriver.BasicGetRange(stringArr1, 0, 50);
    StringDriver.BasicGetRange(stringArr1, 50, 25);
    StringDriver.BasicGetRange(stringArr1, 0, 25);
    StringDriver.BasicGetRange(stringArr1, 75, 25);
    StringDriver.BasicGetRange(stringArr1, 0, 100);
    StringDriver.BasicGetRange(stringArr1, 0, 99);
    StringDriver.BasicGetRange(stringArr1, 1, 1);
    StringDriver.BasicGetRange(stringArr1, 99, 1);
    StringDriver.EnsureRangeIsReference(stringArr1, "SometestString101", 0, 10);
    StringDriver.EnsureThrowsAfterModification(stringArr1, "str", 10, 10);
})

test("basic get range", () => {
    let numbers = [];
    for(let i = 0; i < 10; i++){
        numbers[i] = i;
    }
    let list = List.fromArray(numbers);

    let range = list.getRange(5);
    for(let i = 0; i < range.size; i++){
        console.log(range.get(i));
    }

})