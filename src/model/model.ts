import { Nullable } from '../utils/type';
import { UninitializedObjectException } from '../error/exception';

type ProxyProperty = string | number | symbol;
type Type<T> = {
	new(...args: any[]): T;
};

function throwUninitialized<T extends Object>(target: T, property: Nullable<ProxyProperty>): never {
	throw new UninitializedObjectException(`Instance of type '${target.constructor.name}' is not initialized`);

	/* if(property !== null) {
		throw new UninitializedObjectException(`Object '${target.constructor.name}#${String(property)}' is not initialized`);
	} else {
		throw new UninitializedObjectException(`Object '${target.constructor.name}' is not initialized`);
	} */
};

export abstract class Model {
	public static uninitialized<T extends Model>(type: Type<T>): T {
		return new Proxy(type.prototype, {
			getOwnPropertyDescriptor: (target, property: ProxyProperty) => throwUninitialized(target, property),
			ownKeys: (target) => throwUninitialized(target, null),
			defineProperty: (target, property: ProxyProperty, descriptor: PropertyDescriptor) => throwUninitialized(target, property),
			deleteProperty: (target, property: ProxyProperty) => throwUninitialized(target, property),
			preventExtensions: (target) => throwUninitialized(target, null),
			has: (target, property: ProxyProperty) => throwUninitialized(target, property),
			get: (target, property: ProxyProperty, receiver) => throwUninitialized(target, property),
			set: (target, property: ProxyProperty, value: unknown, receiver) => throwUninitialized(target, property),
			apply: (target, thisArg, args) => throwUninitialized(target, null),
			construct: (target, args) => throwUninitialized(target, null)
		});
	}
}
