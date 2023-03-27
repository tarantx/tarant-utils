import { Actor } from 'tarant'
import { Constructor } from './Constructor'

export function decorate<T extends Actor>(SuperClass: Constructor<T>, ...decorators: any[]): Constructor<T> {
  return class extends (SuperClass as Constructor<Actor>) {
    constructor(params: any) {
      super(params)
      decorators.forEach((decorator) => {
        const instance = new decorator(this)
        const allNames: string[] = Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).filter(
          (name: string) => name !== 'constructor',
        )
        allNames.forEach((name: string) => {
          if (!(this as any).constructor.prototype[name])
            (this as any).constructor.prototype[name] = (...parameters: any[]) => instance[name](...parameters)
        })
      })
    }
  } as Constructor<T>
}
