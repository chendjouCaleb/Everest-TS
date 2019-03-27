import {List} from "../lib/list/list";

test("Simple list foreach test", () => {
    let numbers: number[] = [];

    for(let i = 0; i < 100; i++){
        numbers[i] = i;
    }
    let list = List.fromArray(numbers);

    list.forEach((x, i) => {
        console.log(i + " : " + x );
        expect(x).toBe(numbers[i]);
    })
});

test("native for..of test", () => {
    let numbers: number[] = [];

    for(let i = 0; i < 100; i++){
        numbers[i] = i;
    }
    let list = List.fromArray(numbers);

    let i = 0;
    for (let n of list){
        expect(n).toBe(numbers[i]);
        i++;
    }
});

test("native for..of test on empty list", () => {

    let list = new List();

    let i = 0;
    for (let n of list){
        i++;
    }

    expect(i).toBe(0);
});