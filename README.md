## Typescript debugging decorators

```

function logger(message: string) {
  console.log(message);
}

class TestClass {
  @log({ logger: logger, pattern: '{className}.{methodName}: {arguments}' })
  myMethod(who: string) { }
}

(new TestClass).myMethod('Foo');

// => "TestClass.myMethod: Foo"

```
