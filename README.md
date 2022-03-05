# json-rpc-types
## Install
```sh
npm install --save json-rpc-types
# or
yarn add json-rpc-types
```

## API
```ts
type JsonRpcId = string | number
type JsonRpcParams<T> = T[] | Record<string, T>

interface JsonRpcNotification<T> {
  jsonrpc: '2.0'
  method: string
  params?: JsonRpcParams<T>
}

interface JsonRpcRequest<T> {
  jsonrpc: '2.0'
  id: JsonRpcId
  method: string
  params?: JsonRpcParams<T>
}

type JsonRpcResponse<T> =
| JsonRpcSuccess<T>
| JsonRpcError<T>

interface JsonRpcSuccess<T> {
  jsonrpc: '2.0'
  id: JsonRpcId
  result: T
}

interface JsonRpcError<T> {
  jsonrpc: '2.0'
  id: JsonRpcId
  error: JsonRpcErrorObject<T>
}

interface JsonRpcErrorObject<T> {
  code: number
  message: string
  data?: T
}

function isJsonRpcNotification<T>(val: unknown): val is JsonRpcNotification<T>
function isntJsonRpcNotification<T>(
  val: T
): val is Exclude<T, JsonRpcNotification<unknown>>

function isJsonRpcRequest<T>(val: unknown): val is JsonRpcRequest<T>
function isntJsonRpcRequest<T>(val: T): val is Exclude<T, JsonRpcRequest<unknown>>

function isJsonRpcSuccess<T>(val: unknown): val is JsonRpcSuccess<T>
function isntJsonRpcSuccess<T>(val: T): val is Exclude<T, JsonRpcSuccess<unknown>>

function isJsonRpcError<T>(val: unknown): val is JsonRpcError<T>
function isntJsonRpcError<T>(val: T): val is Exclude<T, JsonRpcError<unknown>>
```
