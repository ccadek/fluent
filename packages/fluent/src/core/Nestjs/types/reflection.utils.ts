import { Type } from './common'
import {
  GqlTypeReference,
  ReturnTypeFunc
} from './interfaces/return-type-func.interface'
import { TypeOptions } from './interfaces/type-options.interface'
import { UndefinedTypeError } from './errors/undefined-type.error'

const get = (obj, path, defaultValue = undefined) => {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      )
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  return result === undefined || result === obj ? defaultValue : result
}

const NOT_ALLOWED_TYPES: Type<any>[] = [Promise, Array, Object, Function]

export interface ReflectTypeOptions {
  metadataKey: 'design:type' | 'design:returntype' | 'design:paramtypes'
  prototype?: Object
  propertyKey: string
  explicitTypeFn?: ReturnTypeFunc
  typeOptions?: TypeOptions
  index?: number
}

export interface TypeMetadata {
  typeFn: (type?: any) => GqlTypeReference
  options: TypeOptions
}

export function reflectTypeFromMetadata(
  reflectOptions: ReflectTypeOptions
): TypeMetadata {
  const {
    metadataKey,
    prototype,
    propertyKey,
    explicitTypeFn,
    typeOptions = {},
    index
  } = reflectOptions

  const options = { ...typeOptions }
  const reflectedType: Type<unknown>[] | Type<unknown> = Reflect.getMetadata(
    metadataKey,
    prototype!,
    propertyKey
  )
  const implicitType = extractTypeIfArray(metadataKey, reflectedType, index!)
  const isNotAllowed = implicitType && NOT_ALLOWED_TYPES.includes(implicitType)

  if (
    (!explicitTypeFn && (!implicitType || isNotAllowed)) ||
    (!implicitType && !explicitTypeFn)
  ) {
    throw new UndefinedTypeError(
      get(prototype, 'constructor.name'),
      propertyKey,
      index
    )
  }
  if (explicitTypeFn) {
    return {
      typeFn: createWrappedExplicitTypeFn(explicitTypeFn, options),
      options
    }
  }
  return {
    typeFn: () => implicitType,
    options:
      implicitType === Array
        ? {
            ...options,
            isArray: true,
            arrayDepth: 1
          }
        : options
  }
}

function extractTypeIfArray(
  metadataKey: 'design:type' | 'design:returntype' | 'design:paramtypes',
  reflectedType: Type<unknown> | Type<unknown>[],
  index: number
): Type<unknown> {
  if (metadataKey === 'design:paramtypes') {
    return (reflectedType as Type<unknown>[])[index]
  }
  return reflectedType as Type<unknown>
}

type DeepArray<T> = Array<DeepArray<T> | T>

function getTypeReferenceAndArrayDepth<T = any>(
  [typeOrArray]: DeepArray<T>,
  depth = 1
) {
  if (!Array.isArray(typeOrArray)) {
    return { depth, typeRef: typeOrArray }
  }
  return getTypeReferenceAndArrayDepth(typeOrArray, depth + 1)
}

function createWrappedExplicitTypeFn(
  explicitTypeFn: ReturnTypeFunc,
  options: TypeOptions
) {
  return () => {
    const explicitTypeRef = explicitTypeFn()
    if (Array.isArray(explicitTypeRef)) {
      const { depth, typeRef } = getTypeReferenceAndArrayDepth(explicitTypeRef)
      options.isArray = true
      options.arrayDepth = depth
      return typeRef
    }
    return explicitTypeRef
  }
}
