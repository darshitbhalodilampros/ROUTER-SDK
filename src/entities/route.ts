// entities/route.ts

import { Route as V3RouteSDK, Pool } from 'lampros-v3'
import { Protocol } from './protocol'
import { Currency, Price, Token } from 'lampros-core'

export interface IRoute<TInput extends Currency, TOutput extends Currency, TPool extends Pool> {
  protocol: Protocol
  // array of pools if v3 or pairs if v2
  pools: TPool[]
  path: Token[]
  midPrice: Price<TInput, TOutput>
  input: TInput
  output: TOutput
}

// V3 route wrapper
export class RouteV3<TInput extends Currency, TOutput extends Currency>
  extends V3RouteSDK<TInput, TOutput>
  implements IRoute<TInput, TOutput, Pool>
{
  public readonly protocol: Protocol = Protocol.V3
  public readonly path: Token[]

  constructor(v3Route: V3RouteSDK<TInput, TOutput>) {
    super(v3Route.pools, v3Route.input, v3Route.output)
    this.path = v3Route.tokenPath
  }
}