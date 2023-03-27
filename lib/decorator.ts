import { Actor } from 'tarant'

export class Decorator<T extends Actor> {
  protected readonly actor: T

  constructor(actor: T) {
    this.actor = actor
  }
}
