import { v4 as uuidV4 } from 'uuid';


export interface logOptions {
  pattern?: string;
  logger?: Function;
}
// Method decorator
//   log `${className}.${methodName}` and arguments when method called
export function log({ pattern = `{className}.{methodName}: {arguments}`, logger = console.log }: logOptions) {

  function applyPattern(className: string, methodName: string, args: IArguments) {
    return  pattern.replace('{className}', className).
              replace('{methodName}', methodName).
              replace('{arguments}', Array.from(args).join(', '));
  }

  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    let original = descriptor.value;
    descriptor.value = function () {
      let className = target.constructor.toString().match(/function\s+([a-zA-Z]+)\(/)[1];
      logger(applyPattern(className, methodName, arguments));
      return original.apply(this, Array.from(arguments));
    };
    return descriptor;
  }
}

export interface ITimerConsole {
  time(label: string): void;
  timeEnd(label: string): void;
}

export interface timeOptions {
  labelPattern?: string;
  timer?: ITimerConsole;
}

// Method decorator
//   log time execution when method called
export function time({ labelPattern = `{className}.{methodName} - {uuid}`, timer = console }: timeOptions) {

  function applyLabelPattern(className: string, methodName: string, uuid: string) {
    return  labelPattern.replace('{className}', className).
              replace('{methodName}', methodName).
              replace('{uuid}', uuid);
  }

  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    let original = descriptor.value;
    descriptor.value = function () {
      let className = target.constructor.toString().match(/function\s+([a-zA-Z]+)\(/)[1];
      let uuid = uuidV4();
      let label = applyLabelPattern(className, methodName, uuid);
      let result: any;
      timer.time(label);
      result = original.apply(this, Array.from(arguments));
      timer.timeEnd(label);
      return result;
    };
    return descriptor;
  }
}