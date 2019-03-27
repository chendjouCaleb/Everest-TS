import {List} from "../lib/list/list";
import {NumberList} from "./list.test.driver";

test("Simple list indexOf test", () => {
    let list = NumberList(100);

    for (let i = 0; i < 100; i++){
        expect(list.indexOf(i)).toBe(i);
    }
});

test("indexOf with non existing values", () => {
    let list = NumberList(100);

    expect(list.indexOf(-1)).toBe(-1);
    expect(list.indexOf(100)).toBe(-1);
});

test("indexOf with duplicated value must return the index of first value", () => {
    let list = new List<string>();

    list.add("value1");
    list.add("value2");
    list.add("value1");

    expect(list.indexOf("value1")).toBe(0);
});

test("LastIndexOf with unique value", () => {
    let list = NumberList(100);

    for (let i = 0; i < 100; i++){
        expect(list.LastIndexOf(i)).toBe(i);
    }
});

test("LastIndexOf with two value", () => {
    let list = NumberList(100);
    for (let i = 0; i < 100; i++){
        list.add(i);
    }

    for (let i = 0; i < 100; i++){
        expect(list.LastIndexOf(i)).toBe(i + 100);
    }
});

test("LastIndexOf with tree duplicated value", () => {
    let list = NumberList(100);
    for (let i = 0; i < 100; i++){
        list.add(i);
    }
    for (let i = 0; i < 100; i++){
        list.add(i);
    }

    for (let i = 0; i < 100; i++){
        expect(list.LastIndexOf(i)).toBe(i + 200);
    }
});

test("LastIndexOf with non existing values", () => {
    let list = NumberList(100);

    expect(list.LastIndexOf(-1)).toBe(-1);
    expect(list.LastIndexOf(100)).toBe(-1);
});