import {NumberList} from "./list.test.driver";
import {List} from "../lib/list/list";
import {ArgumentOutOfRangeException} from "../lib/expection/argument.out.of.range.exception";


test("remove", () => {
    let list = NumberList(10);
    list.removeAt(1);
    console.log(list.toString());
});

test("Simple removeAt() to begin", () => {
    let list = NumberList(100);

    for (let i = 0; i < 99; i++){
        list.removeAt(0);

        expect(list.count()).toBe(100 - 1 - i);
        expect(list.get(0)).toBe(i + 1);
        expect(list.indexOf(i)).toBe(-1);
    }

    expect(list.size).toBe(1);
});

test("Simple removeAt() to middle", () => {
    let list = NumberList(100);

    for (let i = 0; i < 10; i++){
        list.removeAt(50);

        expect(list.count()).toBe(100 - 1 - i);
        expect(list.get(50)).toBe(50 + i + 1);
        expect(list.indexOf(50 + i)).toBe(-1);
    }

    expect(list.size).toBe(90);
});
test("Simple removeAt() at end", () => {
    let list = NumberList(100);

    for (let i = 0; i < 99; i++){
        list.removeAt( 99 - i);

        expect(list.count()).toBe(99 - i);
        expect(list.get(99 - i - 1)).toBe(99 - i - 1);
        expect(list.indexOf(99 - i)).toBe(-1);
    }

    expect(list.size).toBe(1);
});

test("removeAt on non existing index", () => {
    let list = new List<string>();
    list.add("12365");

    expect(() => list.removeAt(1)).toThrow(ArgumentOutOfRangeException);
})