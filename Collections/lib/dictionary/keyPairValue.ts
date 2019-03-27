/**
 * A KeyValuePair holds a key and a value from a dictionary.
 * It is used by the IEnumerable<T> implementation for both IDictionary<TKey, TValue>
 */
export class KeyPairValue<TKey, TValue> {
    constructor(private _key: TKey, private _value: TValue) {

    }

    get Key(){
        return this._key;
    }

    get Value(){
        return this._value;
    }



}