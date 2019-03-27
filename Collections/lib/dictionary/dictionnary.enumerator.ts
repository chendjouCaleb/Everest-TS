import {IEnumerator} from "../enumerator.interface";
import {KeyPairValue} from "./keyPairValue";
import {ListEnumerator} from "../list/list.enumerator";

export interface IDictionaryEnumerator<TKey, TValue> extends IEnumerator<KeyPairValue<TKey, TValue>>{
    
}

export class DictionaryEnumerator<TKey, TValue> extends ListEnumerator<KeyPairValue<TKey, TValue>>
    implements IDictionaryEnumerator<TKey, TValue> {


}