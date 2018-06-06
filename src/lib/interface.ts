export interface KeyValueInterface {
    [key: string]: any;
}

export interface KeyBooleanInterface {
    [key: string]: boolean;
}

export type Constructor<T> = new (...args: any[]) => T;

