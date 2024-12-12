import { isArray, isPlainObject, isObject, isString, isNumber, isUndefined } from '@blackglory/types'

export type JsonRpcId = string | number
export type JsonRpcParams<T> = T[] | Record<string, T>

export interface JsonRpcNotification<T> {
  jsonrpc: '2.0'
  method: string
  params?: JsonRpcParams<T>
}

export interface JsonRpcRequest<T> {
  jsonrpc: '2.0'
  id: JsonRpcId
  method: string
  params?: JsonRpcParams<T>
}

export type JsonRpcResponse<T> =
| JsonRpcSuccess<T>
| JsonRpcError<T>

export interface JsonRpcSuccess<T> {
  jsonrpc: '2.0'
  id: JsonRpcId
  result: T
}

export interface JsonRpcError<T> {
  jsonrpc: '2.0'
  id: JsonRpcId
  error: JsonRpcErrorObject<T>
}

export interface JsonRpcErrorObject<T> {
  code: number
  message: string
  data?: T
}

export function isJsonRpcNotification<T>(val: unknown): val is JsonRpcNotification<T> {
  return isPlainObject(val)
      && isString(val.jsonrpc)
      && isString(val.method)
      && isUndefined(val.id)
      && isJsonRpcParams(val.params)
}

export function isntJsonRpcNotification<T>(
  val: T
): val is Exclude<T, JsonRpcNotification<unknown>> {
  return !isJsonRpcNotification(val)
}

export function isJsonRpcRequest<T>(val: unknown): val is JsonRpcRequest<T> {
  return isPlainObject(val)
      && isString(val.jsonrpc)
      && isString(val.method)
      && isJsonRpcId(val.id)
      && isJsonRpcParams(val.params)
}

export function isntJsonRpcRequest<T>(val: T): val is Exclude<T, JsonRpcRequest<unknown>> {
  return !isJsonRpcRequest(val)
}

export function isJsonRpcSuccess<T>(val: unknown): val is JsonRpcSuccess<T> {
  return isPlainObject(val)
      && isString(val.jsonrpc)
      && isJsonRpcId(val.id)
      && 'result' in val
}

export function isntJsonRpcSuccess<T>(val: T): val is Exclude<T, JsonRpcSuccess<unknown>> {
  return !isJsonRpcSuccess(val)
}

export function isJsonRpcError<T>(val: unknown): val is JsonRpcError<T> {
  return isPlainObject(val)
      && isString(val.jsonrpc)
      && isJsonRpcId(val.id)
      && isJsonRpcErrorObject(val.error)
}

export function isntJsonRpcError<T>(val: T): val is Exclude<T, JsonRpcError<unknown>> {
  return !isJsonRpcError(val)
}

function isJsonRpcErrorObject<T>(val: unknown): val is JsonRpcErrorObject<T> {
  return isPlainObject(val)
      && isNumber(val.code)
      && isString(val.message)
      && (isUndefined(val.data) || isObject(val.data))
}

function isJsonRpcId(val: unknown): val is JsonRpcId {
  return isString(val) || isNumber(val)
}

function isJsonRpcParams<T>(val: unknown): val is JsonRpcParams<T> {
  return isArray(val) || isObject(val)
}
