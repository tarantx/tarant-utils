# ![tarant-utils](https://user-images.githubusercontent.com/3071208/228261034-ed02c1e7-9e94-4b23-9b8b-09cf5e1f887a.png)

![Downloads](https://img.shields.io/npm/dt/tarant-utils.svg)
[![npm](https://img.shields.io/npm/v/tarant-utils.svg)](https://www.npmjs.com/package/tarant-utils)
![npm](https://img.shields.io/npm/l/tarant-utils.svg)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/tarantx/tarant-utils/build.yml?branch=master)
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
[![Maintainability](https://api.codeclimate.com/v1/badges/665e6f6b5b5fefc09e68/maintainability)](https://codeclimate.com/github/tarantx/tarant-utils/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/665e6f6b5b5fefc09e68/test_coverage)](https://codeclimate.com/github/tarantx/tarant-utils/test_coverage)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![issues Welcome](https://img.shields.io/badge/issues-welcome-brightgreen.svg)
![GitHub issues](https://img.shields.io/github/issues/tarantx/tarant-utils.svg)
![GitHub pull requests](https://img.shields.io/github/issues-pr/tarantx/tarant-utils.svg)
## Motivation

Provide a set of utils that help apply some of the paterns that tarant uses.

## Installation

add it to your project using `npm install tarant-utils --save` or `yarn add tarant-utils`

## Usage

### Decorator

We recomend to use the decorator pattern to keaping separation of concerns in between the business logic of an actor and the logic that some of the resolvers and materializers require.

For example having the next actor

```js

class AppActor extends Actor {

  constructor(name: string) {
      super(name)
  }

  public addOne() : void {
      this.counter++
  }

   public counter = 1; 
}
```
the definition of the serialization information could be done like
```js
class SerializationDecorator extends decorator<AppActor> {
    constructor(actor: AppActor) {
        super(actor)
    }

    toJson() {
        return {
            id: this.actor.id,
            type: "AppActor",
            counter: this.actor.counter
        }
    }

    updateFrom({ counter }: any): void {
        this.actor.counter = counter
    }
}
```
and the mix the actor and the decorator for it to be resolved in the actor system that is registered
```js
const DecoratedActor = decorate(AppActor, SerializationDecorator)
export default DecoratedActor
```
