import { Actor } from 'tarant'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Constructor<T extends Actor> = new (...args: any[]) => T
