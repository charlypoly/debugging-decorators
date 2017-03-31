import { v4 as uuidV4 } from 'uuid';
// Method decorator
//   log `${className}.${methodName}` and arguments when method called
export function log(target: any, methodName: String, descriptor: PropertyDescriptor) {
  let original = descriptor.value;
  descriptor.value = function () {
    let className = target.constructor.toString().match(/function\s+([a-zA-Z]+)\(/)[1];
    console.log(`${className}.${methodName}`, arguments);
    return original.apply(this, Array.from(arguments));
  };
  return descriptor;
}
// Method decorator
//   log time execution when method called
export function time(target: any, methodName: String, descriptor: PropertyDescriptor) {
  let original = descriptor.value;
  descriptor.value = function () {
    let className = target.constructor.toString().match(/function\s+([a-zA-Z]+)\(/)[1];
    let uuid = uuidV4();
    let label = `${className}.${methodName} - ${uuid}`;
    let result: any;
    console.time(label);
    result = original.apply(this, Array.from(arguments));
    console.timeEnd(label);
    return result;
  };
  return descriptor;
}