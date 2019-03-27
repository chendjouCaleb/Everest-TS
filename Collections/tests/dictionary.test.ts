import {Dictionary} from "../lib/dictionary/dictionary";

test("Create a dictionary", () => {
    const dictionary = new Dictionary<string, string>();

    expect(dictionary.count()).toBe(0);
    expect(dictionary.keyValues().count()).toBe(0);
    expect(dictionary.values().count()).toBe(0);
    expect(dictionary.keys().count()).toBe(0);
});

test("put value in dictionary", () => {
    const dictionary = new Dictionary<string, any>();
    dictionary.put("one", null);
    dictionary.put("two", 2);
    dictionary.put("three", "three");

    expect(dictionary.count()).toBe(3);
    expect(dictionary.keyValues().count()).toBe(3);
    expect(dictionary.values().count()).toBe(3);
    expect(dictionary.keys().count()).toBe(3);

    expect(dictionary.keys().contains("one")).toBeTruthy();
    expect(dictionary.keys().contains("two")).toBeTruthy();
    expect(dictionary.keys().contains("three")).toBeTruthy();

    expect(dictionary.values().contains(null)).toBeTruthy();
    expect(dictionary.values().contains(2)).toBeTruthy();
    expect(dictionary.values().contains("three")).toBeTruthy();
});


test("remove value in dictionary", () => {
    const dictionary = new Dictionary<string, any>();
    dictionary.put("one", null);
    dictionary.put("two", 2);
    dictionary.put("three", "three");

    dictionary.remove("two");
    dictionary.remove("one");


    expect(dictionary.count()).toBe(1);
    expect(dictionary.keyValues().count()).toBe(1);
    expect(dictionary.values().count()).toBe(1);
    expect(dictionary.keys().count()).toBe(1);

    expect(dictionary.keys().contains("one")).toBeFalsy();
    expect(dictionary.keys().contains("two")).toBeFalsy();
    expect(dictionary.keys().contains("three")).toBeTruthy();

    expect(dictionary.values().contains(null)).toBeFalsy();
    expect(dictionary.values().contains(2)).toBeFalsy();
    expect(dictionary.values().contains("three")).toBeTruthy();
});

test("Dictionary contains key-value", () => {
    const dictionary = new Dictionary<string, any>();
    dictionary.put("one", null);
    dictionary.put("two", 2);
    dictionary.put("three", "three");

    expect(dictionary.containsKey("one")).toBeTruthy();
    expect(dictionary.containsKey("two")).toBeTruthy();
    expect(dictionary.containsKey("three")).toBeTruthy();

    expect(dictionary.containsValue(null)).toBeTruthy();
    expect(dictionary.containsValue(2)).toBeTruthy();
    expect(dictionary.containsValue("three")).toBeTruthy();
});

test("Test dictionary empty state", () => {
    const dictionary = new Dictionary<string, any>();
    expect(dictionary.isEmpty()).toBeTruthy();

    dictionary.put("value", "value");
    expect(dictionary.isEmpty()).toBeFalsy();

    dictionary.remove("value");
    expect(dictionary.isEmpty()).toBeTruthy();
});

test("get element by key in dictionnary", () => {
    const x = { v : "fd" };
    const dictionary = new Dictionary<string, any>();
    dictionary.put("one", null);
    dictionary.put("two", 2);
    dictionary.put("three", "three");
    dictionary.put("x", x);

    expect(dictionary.get("one")).toBe(null);
    expect(dictionary.get("two")).toBe(2);
    expect(dictionary.get("three")).toBe("three");
    expect(dictionary.get("x")).toBe(x);
    expect(dictionary.get("notExist")).toBe(null);

});

