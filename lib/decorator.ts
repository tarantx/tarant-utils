interface Constructor<T extends Actor> {
    new (...args: any[]): T;
}
class decorator<T extends Actor> {
    protected readonly actor: T;

    constructor(actor: T) {
        this.actor = actor
    }
}

function decorate<T extends Actor>(SuperClass: Constructor<T>, ...decorators: any[]): Constructor<T> {
    return <Constructor<T>>class extends (<Constructor<Actor>>SuperClass) {
        constructor(params : any) {
            super(params);
            decorators.forEach(decorator => {
                const instance = new decorator(this)
                let allNames: string[] = Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).filter((name: string) => name !=='constructor')
                allNames.forEach((name: string) =>{
                    if(!(this as any).constructor.prototype[name])
                        (this as any).constructor.prototype[name] = (...parameters: any[]) => instance[name](...parameters)
                })
            })
          }
    }
}