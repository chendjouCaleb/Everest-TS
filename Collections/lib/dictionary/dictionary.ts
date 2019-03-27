import {IDictionary} from "./dictionary.interface";
import {KeyPairValue} from "./keyPairValue";
import {ICollection} from "../collections.interface";
import {List} from "../list/list";
import {DictionaryEnumerator, IDictionaryEnumerator} from "./dictionnary.enumerator";
import {EnumeratorIterator} from "../enumerator.iterator";

/**
 * The {@link IDictionary} implementation based @link {@link List<@link KeyValuePair>}.
 */
export class Dictionary<TKey, TValue> implements IDictionary<TKey, TValue>{

    private _version = 0;

    private _keyValuesPairs = new List<KeyPairValue<TKey, TValue>>();
    private _keys = new List<TKey>();
    private _values = new List<TValue>();


    add(value: KeyPairValue<TKey, TValue>): void {
        if(!this._keyValuesPairs.contains(value)){
            this._keyValuesPairs.add(value);
        }
    }

    clear(): void {
        this._version++;
        this._keyValuesPairs.clear();
        this._values.clear();
        this._keys.clear();
    }


    containsKey(key: TKey): boolean {
        return this._keys.contains(key);
    }


    count(): number {
        return this._keyValuesPairs.count();
    }

    containsValue(value: TValue): boolean {
        return this._values.contains(value);
    }

    get(key: TKey): TValue | null {
        let value =  this._keyValuesPairs.find(kvp => kvp.Key === key);
        if(value != null){
            return value.Value;
        }
        return null;
    }

    getEnumerator(): IDictionaryEnumerator<TKey, TValue> {
        return new DictionaryEnumerator<TKey, TValue>(this._keyValuesPairs);
    }

    isEmpty(): boolean {
        return this.count() == 0;
    }

    keyValues(): ICollection<KeyPairValue<TKey, TValue>> {
        return this._keyValuesPairs.getRange();
    }

    keys(): ICollection<TKey> {
        return this._keys.getRange();
    }

    put(key: TKey, value: TValue): void {
        if(this.containsKey(key)){
            this.remove(key);
        }
        const kvp = new KeyPairValue(key, value);
        this._keyValuesPairs.add(kvp);
        this._values.add(value);
        this._keys.add(key);
    }

    remove(key: TKey): boolean {
        if(!this._keys.contains(key)){
            return false;
        }

        const kvp = this._keyValuesPairs.find(kvp => kvp.Key === key);

        // Lack of language.
        if(kvp != null){
            const kvpIndex = this._keyValuesPairs.indexOf(kvp);
            this._keyValuesPairs.remove(kvp);
            this._keys.removeAt(kvpIndex);
            this._values.removeAt(kvpIndex);
        }
        return true;
    }

    values(): ICollection<TValue> {
        return this._values.getRange();
    }

    /**
     * Iterator to support a for..of operator.
     */
    [Symbol.iterator](): EnumeratorIterator<KeyPairValue<TKey, TValue>> {
        return new EnumeratorIterator(this.getEnumerator());
    }
}