import { List } from "../lib/list/list";

test("two", () => expect(2).toBe(2))
test("default constructor", () => {
    let list = new List<any>();
    expect(list.count()).toBe(0);
    expect(list.isReadOnly()).toBe(false);
})

test("List from array", () => {
    let numbers: number[] = [];

    for(let i = 0; i < 100; i++){
        numbers[i] = i;
    }
    let list = List.fromArray(numbers);

    for(let i = 0; i < 100; i++){
        expect(list.get(i)).toBe(i);
    }

    expect(list.size).toBe(100);
    expect(list.version).toBe(100);
})

test("add", () => {
    let list = new List<number>();

    for(let i = 0; i < 100; i++){
        list.add(i);
    }

    for(let i = 0; i < 100; i++){
        expect(list.get(i)).toBe(i);
    }


    expect(list.count()).toBe(100);
    expect(list.version).toBe(100);
})

test("copyTo without index", () => {
    let list = new List<number>();
    for(let i = 0; i < 100; i++){
        list.add(i);
    }

    let numbers:number[] = [];
    list.copyTo(numbers);

    for(let i = 0; i < 100; i++){
        expect(numbers[i]).toBe(i);
    }

    expect(numbers.length).toBe(100);
});


test("copyTo with stating index", () => {
    let list = new List<number>();
    for(let i = 0; i < 10; i++){
        list.add(i);
    }

    let numbers:number[] = [];
    list.copyTo(numbers, 5);

    for(let i = 0; i < 5; i++){
        expect(numbers[i]).toBe(5+i);
    }

    expect(numbers.length).toBe(5);
})

