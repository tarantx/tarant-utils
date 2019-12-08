# tarant-utils

[![npm](https://img.shields.io/npm/v/tarant-utils.svg)](https://www.npmjs.com/package/tarant-utils)
[![Build Status](https://travis-ci.org/tarantx/tarant-utils.svg?branch=master)](https://travis-ci.org/tarantx/tarant-utils)
[![Coverage Status](https://coveralls.io/repos/github/tarantx/tarant-utils/badge.svg?branch=master)](https://coveralls.io/github/tarantx/tarant-utils?branch=master)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![issues Welcome](https://img.shields.io/badge/issues-welcome-brightgreen.svg)
![npm](https://img.shields.io/npm/l/tarant-utils.svg)
![GitHub issues](https://img.shields.io/github/issues/tarantx/tarant-utils.svg)
![GitHub pull requests](https://img.shields.io/github/issues-pr/tarantx/tarant-utils.svg)
![Downloads](https://img.shields.io/npm/dt/tarant-utils.svg)

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

##### Created my free [logo](https://logomakr.com/8lSyYS) at <a href="http://logomakr.com" title="Logo Makr">LogoMakr.com</a> 

