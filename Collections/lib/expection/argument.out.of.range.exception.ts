export class ArgumentOutOfRangeException extends Error {
    constructor(message = "The given index is out of range of index of the collection"){
        super(message);
    }
}