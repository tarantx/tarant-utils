import { Actor } from 'tarant'

export type Constructor<T extends Actor> = new (...args: any[]) => T
