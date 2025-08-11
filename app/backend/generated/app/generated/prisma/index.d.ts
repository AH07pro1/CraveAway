
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model CravingType
 * 
 */
export type CravingType = $Result.DefaultSelection<Prisma.$CravingTypePayload>
/**
 * Model CravingEvent
 * 
 */
export type CravingEvent = $Result.DefaultSelection<Prisma.$CravingEventPayload>
/**
 * Model UserProgress
 * 
 */
export type UserProgress = $Result.DefaultSelection<Prisma.$UserProgressPayload>
/**
 * Model UserDailyCheckin
 * 
 */
export type UserDailyCheckin = $Result.DefaultSelection<Prisma.$UserDailyCheckinPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CravingTypes
 * const cravingTypes = await prisma.cravingType.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more CravingTypes
   * const cravingTypes = await prisma.cravingType.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.cravingType`: Exposes CRUD operations for the **CravingType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CravingTypes
    * const cravingTypes = await prisma.cravingType.findMany()
    * ```
    */
  get cravingType(): Prisma.CravingTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cravingEvent`: Exposes CRUD operations for the **CravingEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CravingEvents
    * const cravingEvents = await prisma.cravingEvent.findMany()
    * ```
    */
  get cravingEvent(): Prisma.CravingEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userProgress`: Exposes CRUD operations for the **UserProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProgresses
    * const userProgresses = await prisma.userProgress.findMany()
    * ```
    */
  get userProgress(): Prisma.UserProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userDailyCheckin`: Exposes CRUD operations for the **UserDailyCheckin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserDailyCheckins
    * const userDailyCheckins = await prisma.userDailyCheckin.findMany()
    * ```
    */
  get userDailyCheckin(): Prisma.UserDailyCheckinDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    CravingType: 'CravingType',
    CravingEvent: 'CravingEvent',
    UserProgress: 'UserProgress',
    UserDailyCheckin: 'UserDailyCheckin'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "cravingType" | "cravingEvent" | "userProgress" | "userDailyCheckin"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      CravingType: {
        payload: Prisma.$CravingTypePayload<ExtArgs>
        fields: Prisma.CravingTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CravingTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CravingTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingTypePayload>
          }
          findFirst: {
            args: Prisma.CravingTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CravingTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingTypePayload>
          }
          findMany: {
            args: Prisma.CravingTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingTypePayload>[]
          }
          create: {
            args: Prisma.CravingTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingTypePayload>
          }
          createMany: {
            args: Prisma.CravingTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CravingTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingTypePayload>[]
          }
          delete: {
            args: Prisma.CravingTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingTypePayload>
          }
          update: {
            args: Prisma.CravingTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingTypePayload>
          }
          deleteMany: {
            args: Prisma.CravingTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CravingTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CravingTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingTypePayload>[]
          }
          upsert: {
            args: Prisma.CravingTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingTypePayload>
          }
          aggregate: {
            args: Prisma.CravingTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCravingType>
          }
          groupBy: {
            args: Prisma.CravingTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CravingTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CravingTypeCountArgs<ExtArgs>
            result: $Utils.Optional<CravingTypeCountAggregateOutputType> | number
          }
        }
      }
      CravingEvent: {
        payload: Prisma.$CravingEventPayload<ExtArgs>
        fields: Prisma.CravingEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CravingEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CravingEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingEventPayload>
          }
          findFirst: {
            args: Prisma.CravingEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CravingEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingEventPayload>
          }
          findMany: {
            args: Prisma.CravingEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingEventPayload>[]
          }
          create: {
            args: Prisma.CravingEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingEventPayload>
          }
          createMany: {
            args: Prisma.CravingEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CravingEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingEventPayload>[]
          }
          delete: {
            args: Prisma.CravingEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingEventPayload>
          }
          update: {
            args: Prisma.CravingEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingEventPayload>
          }
          deleteMany: {
            args: Prisma.CravingEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CravingEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CravingEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingEventPayload>[]
          }
          upsert: {
            args: Prisma.CravingEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CravingEventPayload>
          }
          aggregate: {
            args: Prisma.CravingEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCravingEvent>
          }
          groupBy: {
            args: Prisma.CravingEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<CravingEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.CravingEventCountArgs<ExtArgs>
            result: $Utils.Optional<CravingEventCountAggregateOutputType> | number
          }
        }
      }
      UserProgress: {
        payload: Prisma.$UserProgressPayload<ExtArgs>
        fields: Prisma.UserProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          findFirst: {
            args: Prisma.UserProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          findMany: {
            args: Prisma.UserProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>[]
          }
          create: {
            args: Prisma.UserProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          createMany: {
            args: Prisma.UserProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>[]
          }
          delete: {
            args: Prisma.UserProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          update: {
            args: Prisma.UserProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          deleteMany: {
            args: Prisma.UserProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>[]
          }
          upsert: {
            args: Prisma.UserProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          aggregate: {
            args: Prisma.UserProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProgress>
          }
          groupBy: {
            args: Prisma.UserProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProgressCountArgs<ExtArgs>
            result: $Utils.Optional<UserProgressCountAggregateOutputType> | number
          }
        }
      }
      UserDailyCheckin: {
        payload: Prisma.$UserDailyCheckinPayload<ExtArgs>
        fields: Prisma.UserDailyCheckinFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserDailyCheckinFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDailyCheckinPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserDailyCheckinFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDailyCheckinPayload>
          }
          findFirst: {
            args: Prisma.UserDailyCheckinFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDailyCheckinPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserDailyCheckinFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDailyCheckinPayload>
          }
          findMany: {
            args: Prisma.UserDailyCheckinFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDailyCheckinPayload>[]
          }
          create: {
            args: Prisma.UserDailyCheckinCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDailyCheckinPayload>
          }
          createMany: {
            args: Prisma.UserDailyCheckinCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserDailyCheckinCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDailyCheckinPayload>[]
          }
          delete: {
            args: Prisma.UserDailyCheckinDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDailyCheckinPayload>
          }
          update: {
            args: Prisma.UserDailyCheckinUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDailyCheckinPayload>
          }
          deleteMany: {
            args: Prisma.UserDailyCheckinDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserDailyCheckinUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserDailyCheckinUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDailyCheckinPayload>[]
          }
          upsert: {
            args: Prisma.UserDailyCheckinUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDailyCheckinPayload>
          }
          aggregate: {
            args: Prisma.UserDailyCheckinAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserDailyCheckin>
          }
          groupBy: {
            args: Prisma.UserDailyCheckinGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserDailyCheckinGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserDailyCheckinCountArgs<ExtArgs>
            result: $Utils.Optional<UserDailyCheckinCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    cravingType?: CravingTypeOmit
    cravingEvent?: CravingEventOmit
    userProgress?: UserProgressOmit
    userDailyCheckin?: UserDailyCheckinOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CravingTypeCountOutputType
   */

  export type CravingTypeCountOutputType = {
    events: number
  }

  export type CravingTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | CravingTypeCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * CravingTypeCountOutputType without action
   */
  export type CravingTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingTypeCountOutputType
     */
    select?: CravingTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CravingTypeCountOutputType without action
   */
  export type CravingTypeCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CravingEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model CravingType
   */

  export type AggregateCravingType = {
    _count: CravingTypeCountAggregateOutputType | null
    _avg: CravingTypeAvgAggregateOutputType | null
    _sum: CravingTypeSumAggregateOutputType | null
    _min: CravingTypeMinAggregateOutputType | null
    _max: CravingTypeMaxAggregateOutputType | null
  }

  export type CravingTypeAvgAggregateOutputType = {
    id: number | null
  }

  export type CravingTypeSumAggregateOutputType = {
    id: number | null
  }

  export type CravingTypeMinAggregateOutputType = {
    id: number | null
    name: string | null
    isCustom: boolean | null
    userId: string | null
  }

  export type CravingTypeMaxAggregateOutputType = {
    id: number | null
    name: string | null
    isCustom: boolean | null
    userId: string | null
  }

  export type CravingTypeCountAggregateOutputType = {
    id: number
    name: number
    isCustom: number
    userId: number
    _all: number
  }


  export type CravingTypeAvgAggregateInputType = {
    id?: true
  }

  export type CravingTypeSumAggregateInputType = {
    id?: true
  }

  export type CravingTypeMinAggregateInputType = {
    id?: true
    name?: true
    isCustom?: true
    userId?: true
  }

  export type CravingTypeMaxAggregateInputType = {
    id?: true
    name?: true
    isCustom?: true
    userId?: true
  }

  export type CravingTypeCountAggregateInputType = {
    id?: true
    name?: true
    isCustom?: true
    userId?: true
    _all?: true
  }

  export type CravingTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CravingType to aggregate.
     */
    where?: CravingTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CravingTypes to fetch.
     */
    orderBy?: CravingTypeOrderByWithRelationInput | CravingTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CravingTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CravingTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CravingTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CravingTypes
    **/
    _count?: true | CravingTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CravingTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CravingTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CravingTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CravingTypeMaxAggregateInputType
  }

  export type GetCravingTypeAggregateType<T extends CravingTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateCravingType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCravingType[P]>
      : GetScalarType<T[P], AggregateCravingType[P]>
  }




  export type CravingTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CravingTypeWhereInput
    orderBy?: CravingTypeOrderByWithAggregationInput | CravingTypeOrderByWithAggregationInput[]
    by: CravingTypeScalarFieldEnum[] | CravingTypeScalarFieldEnum
    having?: CravingTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CravingTypeCountAggregateInputType | true
    _avg?: CravingTypeAvgAggregateInputType
    _sum?: CravingTypeSumAggregateInputType
    _min?: CravingTypeMinAggregateInputType
    _max?: CravingTypeMaxAggregateInputType
  }

  export type CravingTypeGroupByOutputType = {
    id: number
    name: string
    isCustom: boolean
    userId: string | null
    _count: CravingTypeCountAggregateOutputType | null
    _avg: CravingTypeAvgAggregateOutputType | null
    _sum: CravingTypeSumAggregateOutputType | null
    _min: CravingTypeMinAggregateOutputType | null
    _max: CravingTypeMaxAggregateOutputType | null
  }

  type GetCravingTypeGroupByPayload<T extends CravingTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CravingTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CravingTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CravingTypeGroupByOutputType[P]>
            : GetScalarType<T[P], CravingTypeGroupByOutputType[P]>
        }
      >
    >


  export type CravingTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isCustom?: boolean
    userId?: boolean
    events?: boolean | CravingType$eventsArgs<ExtArgs>
    _count?: boolean | CravingTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cravingType"]>

  export type CravingTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isCustom?: boolean
    userId?: boolean
  }, ExtArgs["result"]["cravingType"]>

  export type CravingTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isCustom?: boolean
    userId?: boolean
  }, ExtArgs["result"]["cravingType"]>

  export type CravingTypeSelectScalar = {
    id?: boolean
    name?: boolean
    isCustom?: boolean
    userId?: boolean
  }

  export type CravingTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "isCustom" | "userId", ExtArgs["result"]["cravingType"]>
  export type CravingTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | CravingType$eventsArgs<ExtArgs>
    _count?: boolean | CravingTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CravingTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CravingTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CravingTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CravingType"
    objects: {
      events: Prisma.$CravingEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      isCustom: boolean
      userId: string | null
    }, ExtArgs["result"]["cravingType"]>
    composites: {}
  }

  type CravingTypeGetPayload<S extends boolean | null | undefined | CravingTypeDefaultArgs> = $Result.GetResult<Prisma.$CravingTypePayload, S>

  type CravingTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CravingTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CravingTypeCountAggregateInputType | true
    }

  export interface CravingTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CravingType'], meta: { name: 'CravingType' } }
    /**
     * Find zero or one CravingType that matches the filter.
     * @param {CravingTypeFindUniqueArgs} args - Arguments to find a CravingType
     * @example
     * // Get one CravingType
     * const cravingType = await prisma.cravingType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CravingTypeFindUniqueArgs>(args: SelectSubset<T, CravingTypeFindUniqueArgs<ExtArgs>>): Prisma__CravingTypeClient<$Result.GetResult<Prisma.$CravingTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CravingType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CravingTypeFindUniqueOrThrowArgs} args - Arguments to find a CravingType
     * @example
     * // Get one CravingType
     * const cravingType = await prisma.cravingType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CravingTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, CravingTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CravingTypeClient<$Result.GetResult<Prisma.$CravingTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CravingType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CravingTypeFindFirstArgs} args - Arguments to find a CravingType
     * @example
     * // Get one CravingType
     * const cravingType = await prisma.cravingType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CravingTypeFindFirstArgs>(args?: SelectSubset<T, CravingTypeFindFirstArgs<ExtArgs>>): Prisma__CravingTypeClient<$Result.GetResult<Prisma.$CravingTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CravingType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CravingTypeFindFirstOrThrowArgs} args - Arguments to find a CravingType
     * @example
     * // Get one CravingType
     * const cravingType = await prisma.cravingType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CravingTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, CravingTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CravingTypeClient<$Result.GetResult<Prisma.$CravingTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CravingTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CravingTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CravingTypes
     * const cravingTypes = await prisma.cravingType.findMany()
     * 
     * // Get first 10 CravingTypes
     * const cravingTypes = await prisma.cravingType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cravingTypeWithIdOnly = await prisma.cravingType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CravingTypeFindManyArgs>(args?: SelectSubset<T, CravingTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CravingTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CravingType.
     * @param {CravingTypeCreateArgs} args - Arguments to create a CravingType.
     * @example
     * // Create one CravingType
     * const CravingType = await prisma.cravingType.create({
     *   data: {
     *     // ... data to create a CravingType
     *   }
     * })
     * 
     */
    create<T extends CravingTypeCreateArgs>(args: SelectSubset<T, CravingTypeCreateArgs<ExtArgs>>): Prisma__CravingTypeClient<$Result.GetResult<Prisma.$CravingTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CravingTypes.
     * @param {CravingTypeCreateManyArgs} args - Arguments to create many CravingTypes.
     * @example
     * // Create many CravingTypes
     * const cravingType = await prisma.cravingType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CravingTypeCreateManyArgs>(args?: SelectSubset<T, CravingTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CravingTypes and returns the data saved in the database.
     * @param {CravingTypeCreateManyAndReturnArgs} args - Arguments to create many CravingTypes.
     * @example
     * // Create many CravingTypes
     * const cravingType = await prisma.cravingType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CravingTypes and only return the `id`
     * const cravingTypeWithIdOnly = await prisma.cravingType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CravingTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, CravingTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CravingTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CravingType.
     * @param {CravingTypeDeleteArgs} args - Arguments to delete one CravingType.
     * @example
     * // Delete one CravingType
     * const CravingType = await prisma.cravingType.delete({
     *   where: {
     *     // ... filter to delete one CravingType
     *   }
     * })
     * 
     */
    delete<T extends CravingTypeDeleteArgs>(args: SelectSubset<T, CravingTypeDeleteArgs<ExtArgs>>): Prisma__CravingTypeClient<$Result.GetResult<Prisma.$CravingTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CravingType.
     * @param {CravingTypeUpdateArgs} args - Arguments to update one CravingType.
     * @example
     * // Update one CravingType
     * const cravingType = await prisma.cravingType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CravingTypeUpdateArgs>(args: SelectSubset<T, CravingTypeUpdateArgs<ExtArgs>>): Prisma__CravingTypeClient<$Result.GetResult<Prisma.$CravingTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CravingTypes.
     * @param {CravingTypeDeleteManyArgs} args - Arguments to filter CravingTypes to delete.
     * @example
     * // Delete a few CravingTypes
     * const { count } = await prisma.cravingType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CravingTypeDeleteManyArgs>(args?: SelectSubset<T, CravingTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CravingTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CravingTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CravingTypes
     * const cravingType = await prisma.cravingType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CravingTypeUpdateManyArgs>(args: SelectSubset<T, CravingTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CravingTypes and returns the data updated in the database.
     * @param {CravingTypeUpdateManyAndReturnArgs} args - Arguments to update many CravingTypes.
     * @example
     * // Update many CravingTypes
     * const cravingType = await prisma.cravingType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CravingTypes and only return the `id`
     * const cravingTypeWithIdOnly = await prisma.cravingType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CravingTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, CravingTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CravingTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CravingType.
     * @param {CravingTypeUpsertArgs} args - Arguments to update or create a CravingType.
     * @example
     * // Update or create a CravingType
     * const cravingType = await prisma.cravingType.upsert({
     *   create: {
     *     // ... data to create a CravingType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CravingType we want to update
     *   }
     * })
     */
    upsert<T extends CravingTypeUpsertArgs>(args: SelectSubset<T, CravingTypeUpsertArgs<ExtArgs>>): Prisma__CravingTypeClient<$Result.GetResult<Prisma.$CravingTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CravingTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CravingTypeCountArgs} args - Arguments to filter CravingTypes to count.
     * @example
     * // Count the number of CravingTypes
     * const count = await prisma.cravingType.count({
     *   where: {
     *     // ... the filter for the CravingTypes we want to count
     *   }
     * })
    **/
    count<T extends CravingTypeCountArgs>(
      args?: Subset<T, CravingTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CravingTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CravingType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CravingTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CravingTypeAggregateArgs>(args: Subset<T, CravingTypeAggregateArgs>): Prisma.PrismaPromise<GetCravingTypeAggregateType<T>>

    /**
     * Group by CravingType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CravingTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CravingTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CravingTypeGroupByArgs['orderBy'] }
        : { orderBy?: CravingTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CravingTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCravingTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CravingType model
   */
  readonly fields: CravingTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CravingType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CravingTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    events<T extends CravingType$eventsArgs<ExtArgs> = {}>(args?: Subset<T, CravingType$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CravingEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CravingType model
   */
  interface CravingTypeFieldRefs {
    readonly id: FieldRef<"CravingType", 'Int'>
    readonly name: FieldRef<"CravingType", 'String'>
    readonly isCustom: FieldRef<"CravingType", 'Boolean'>
    readonly userId: FieldRef<"CravingType", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CravingType findUnique
   */
  export type CravingTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingType
     */
    select?: CravingTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingType
     */
    omit?: CravingTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingTypeInclude<ExtArgs> | null
    /**
     * Filter, which CravingType to fetch.
     */
    where: CravingTypeWhereUniqueInput
  }

  /**
   * CravingType findUniqueOrThrow
   */
  export type CravingTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingType
     */
    select?: CravingTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingType
     */
    omit?: CravingTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingTypeInclude<ExtArgs> | null
    /**
     * Filter, which CravingType to fetch.
     */
    where: CravingTypeWhereUniqueInput
  }

  /**
   * CravingType findFirst
   */
  export type CravingTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingType
     */
    select?: CravingTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingType
     */
    omit?: CravingTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingTypeInclude<ExtArgs> | null
    /**
     * Filter, which CravingType to fetch.
     */
    where?: CravingTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CravingTypes to fetch.
     */
    orderBy?: CravingTypeOrderByWithRelationInput | CravingTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CravingTypes.
     */
    cursor?: CravingTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CravingTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CravingTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CravingTypes.
     */
    distinct?: CravingTypeScalarFieldEnum | CravingTypeScalarFieldEnum[]
  }

  /**
   * CravingType findFirstOrThrow
   */
  export type CravingTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingType
     */
    select?: CravingTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingType
     */
    omit?: CravingTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingTypeInclude<ExtArgs> | null
    /**
     * Filter, which CravingType to fetch.
     */
    where?: CravingTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CravingTypes to fetch.
     */
    orderBy?: CravingTypeOrderByWithRelationInput | CravingTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CravingTypes.
     */
    cursor?: CravingTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CravingTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CravingTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CravingTypes.
     */
    distinct?: CravingTypeScalarFieldEnum | CravingTypeScalarFieldEnum[]
  }

  /**
   * CravingType findMany
   */
  export type CravingTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingType
     */
    select?: CravingTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingType
     */
    omit?: CravingTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingTypeInclude<ExtArgs> | null
    /**
     * Filter, which CravingTypes to fetch.
     */
    where?: CravingTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CravingTypes to fetch.
     */
    orderBy?: CravingTypeOrderByWithRelationInput | CravingTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CravingTypes.
     */
    cursor?: CravingTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CravingTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CravingTypes.
     */
    skip?: number
    distinct?: CravingTypeScalarFieldEnum | CravingTypeScalarFieldEnum[]
  }

  /**
   * CravingType create
   */
  export type CravingTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingType
     */
    select?: CravingTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingType
     */
    omit?: CravingTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a CravingType.
     */
    data: XOR<CravingTypeCreateInput, CravingTypeUncheckedCreateInput>
  }

  /**
   * CravingType createMany
   */
  export type CravingTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CravingTypes.
     */
    data: CravingTypeCreateManyInput | CravingTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CravingType createManyAndReturn
   */
  export type CravingTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingType
     */
    select?: CravingTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CravingType
     */
    omit?: CravingTypeOmit<ExtArgs> | null
    /**
     * The data used to create many CravingTypes.
     */
    data: CravingTypeCreateManyInput | CravingTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CravingType update
   */
  export type CravingTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingType
     */
    select?: CravingTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingType
     */
    omit?: CravingTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a CravingType.
     */
    data: XOR<CravingTypeUpdateInput, CravingTypeUncheckedUpdateInput>
    /**
     * Choose, which CravingType to update.
     */
    where: CravingTypeWhereUniqueInput
  }

  /**
   * CravingType updateMany
   */
  export type CravingTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CravingTypes.
     */
    data: XOR<CravingTypeUpdateManyMutationInput, CravingTypeUncheckedUpdateManyInput>
    /**
     * Filter which CravingTypes to update
     */
    where?: CravingTypeWhereInput
    /**
     * Limit how many CravingTypes to update.
     */
    limit?: number
  }

  /**
   * CravingType updateManyAndReturn
   */
  export type CravingTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingType
     */
    select?: CravingTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CravingType
     */
    omit?: CravingTypeOmit<ExtArgs> | null
    /**
     * The data used to update CravingTypes.
     */
    data: XOR<CravingTypeUpdateManyMutationInput, CravingTypeUncheckedUpdateManyInput>
    /**
     * Filter which CravingTypes to update
     */
    where?: CravingTypeWhereInput
    /**
     * Limit how many CravingTypes to update.
     */
    limit?: number
  }

  /**
   * CravingType upsert
   */
  export type CravingTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingType
     */
    select?: CravingTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingType
     */
    omit?: CravingTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the CravingType to update in case it exists.
     */
    where: CravingTypeWhereUniqueInput
    /**
     * In case the CravingType found by the `where` argument doesn't exist, create a new CravingType with this data.
     */
    create: XOR<CravingTypeCreateInput, CravingTypeUncheckedCreateInput>
    /**
     * In case the CravingType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CravingTypeUpdateInput, CravingTypeUncheckedUpdateInput>
  }

  /**
   * CravingType delete
   */
  export type CravingTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingType
     */
    select?: CravingTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingType
     */
    omit?: CravingTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingTypeInclude<ExtArgs> | null
    /**
     * Filter which CravingType to delete.
     */
    where: CravingTypeWhereUniqueInput
  }

  /**
   * CravingType deleteMany
   */
  export type CravingTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CravingTypes to delete
     */
    where?: CravingTypeWhereInput
    /**
     * Limit how many CravingTypes to delete.
     */
    limit?: number
  }

  /**
   * CravingType.events
   */
  export type CravingType$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingEvent
     */
    select?: CravingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingEvent
     */
    omit?: CravingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingEventInclude<ExtArgs> | null
    where?: CravingEventWhereInput
    orderBy?: CravingEventOrderByWithRelationInput | CravingEventOrderByWithRelationInput[]
    cursor?: CravingEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CravingEventScalarFieldEnum | CravingEventScalarFieldEnum[]
  }

  /**
   * CravingType without action
   */
  export type CravingTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingType
     */
    select?: CravingTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingType
     */
    omit?: CravingTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingTypeInclude<ExtArgs> | null
  }


  /**
   * Model CravingEvent
   */

  export type AggregateCravingEvent = {
    _count: CravingEventCountAggregateOutputType | null
    _avg: CravingEventAvgAggregateOutputType | null
    _sum: CravingEventSumAggregateOutputType | null
    _min: CravingEventMinAggregateOutputType | null
    _max: CravingEventMaxAggregateOutputType | null
  }

  export type CravingEventAvgAggregateOutputType = {
    id: number | null
    intensity: number | null
    typeId: number | null
  }

  export type CravingEventSumAggregateOutputType = {
    id: number | null
    intensity: number | null
    typeId: number | null
  }

  export type CravingEventMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    intensity: number | null
    notes: string | null
    resolved: boolean | null
    typeId: number | null
    userId: string | null
    resolvedAt: Date | null
  }

  export type CravingEventMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    intensity: number | null
    notes: string | null
    resolved: boolean | null
    typeId: number | null
    userId: string | null
    resolvedAt: Date | null
  }

  export type CravingEventCountAggregateOutputType = {
    id: number
    createdAt: number
    intensity: number
    notes: number
    resolved: number
    typeId: number
    userId: number
    resolvedAt: number
    _all: number
  }


  export type CravingEventAvgAggregateInputType = {
    id?: true
    intensity?: true
    typeId?: true
  }

  export type CravingEventSumAggregateInputType = {
    id?: true
    intensity?: true
    typeId?: true
  }

  export type CravingEventMinAggregateInputType = {
    id?: true
    createdAt?: true
    intensity?: true
    notes?: true
    resolved?: true
    typeId?: true
    userId?: true
    resolvedAt?: true
  }

  export type CravingEventMaxAggregateInputType = {
    id?: true
    createdAt?: true
    intensity?: true
    notes?: true
    resolved?: true
    typeId?: true
    userId?: true
    resolvedAt?: true
  }

  export type CravingEventCountAggregateInputType = {
    id?: true
    createdAt?: true
    intensity?: true
    notes?: true
    resolved?: true
    typeId?: true
    userId?: true
    resolvedAt?: true
    _all?: true
  }

  export type CravingEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CravingEvent to aggregate.
     */
    where?: CravingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CravingEvents to fetch.
     */
    orderBy?: CravingEventOrderByWithRelationInput | CravingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CravingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CravingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CravingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CravingEvents
    **/
    _count?: true | CravingEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CravingEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CravingEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CravingEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CravingEventMaxAggregateInputType
  }

  export type GetCravingEventAggregateType<T extends CravingEventAggregateArgs> = {
        [P in keyof T & keyof AggregateCravingEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCravingEvent[P]>
      : GetScalarType<T[P], AggregateCravingEvent[P]>
  }




  export type CravingEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CravingEventWhereInput
    orderBy?: CravingEventOrderByWithAggregationInput | CravingEventOrderByWithAggregationInput[]
    by: CravingEventScalarFieldEnum[] | CravingEventScalarFieldEnum
    having?: CravingEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CravingEventCountAggregateInputType | true
    _avg?: CravingEventAvgAggregateInputType
    _sum?: CravingEventSumAggregateInputType
    _min?: CravingEventMinAggregateInputType
    _max?: CravingEventMaxAggregateInputType
  }

  export type CravingEventGroupByOutputType = {
    id: number
    createdAt: Date
    intensity: number | null
    notes: string | null
    resolved: boolean
    typeId: number | null
    userId: string
    resolvedAt: Date | null
    _count: CravingEventCountAggregateOutputType | null
    _avg: CravingEventAvgAggregateOutputType | null
    _sum: CravingEventSumAggregateOutputType | null
    _min: CravingEventMinAggregateOutputType | null
    _max: CravingEventMaxAggregateOutputType | null
  }

  type GetCravingEventGroupByPayload<T extends CravingEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CravingEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CravingEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CravingEventGroupByOutputType[P]>
            : GetScalarType<T[P], CravingEventGroupByOutputType[P]>
        }
      >
    >


  export type CravingEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    intensity?: boolean
    notes?: boolean
    resolved?: boolean
    typeId?: boolean
    userId?: boolean
    resolvedAt?: boolean
    type?: boolean | CravingEvent$typeArgs<ExtArgs>
  }, ExtArgs["result"]["cravingEvent"]>

  export type CravingEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    intensity?: boolean
    notes?: boolean
    resolved?: boolean
    typeId?: boolean
    userId?: boolean
    resolvedAt?: boolean
    type?: boolean | CravingEvent$typeArgs<ExtArgs>
  }, ExtArgs["result"]["cravingEvent"]>

  export type CravingEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    intensity?: boolean
    notes?: boolean
    resolved?: boolean
    typeId?: boolean
    userId?: boolean
    resolvedAt?: boolean
    type?: boolean | CravingEvent$typeArgs<ExtArgs>
  }, ExtArgs["result"]["cravingEvent"]>

  export type CravingEventSelectScalar = {
    id?: boolean
    createdAt?: boolean
    intensity?: boolean
    notes?: boolean
    resolved?: boolean
    typeId?: boolean
    userId?: boolean
    resolvedAt?: boolean
  }

  export type CravingEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "intensity" | "notes" | "resolved" | "typeId" | "userId" | "resolvedAt", ExtArgs["result"]["cravingEvent"]>
  export type CravingEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    type?: boolean | CravingEvent$typeArgs<ExtArgs>
  }
  export type CravingEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    type?: boolean | CravingEvent$typeArgs<ExtArgs>
  }
  export type CravingEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    type?: boolean | CravingEvent$typeArgs<ExtArgs>
  }

  export type $CravingEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CravingEvent"
    objects: {
      type: Prisma.$CravingTypePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      intensity: number | null
      notes: string | null
      resolved: boolean
      typeId: number | null
      userId: string
      resolvedAt: Date | null
    }, ExtArgs["result"]["cravingEvent"]>
    composites: {}
  }

  type CravingEventGetPayload<S extends boolean | null | undefined | CravingEventDefaultArgs> = $Result.GetResult<Prisma.$CravingEventPayload, S>

  type CravingEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CravingEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CravingEventCountAggregateInputType | true
    }

  export interface CravingEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CravingEvent'], meta: { name: 'CravingEvent' } }
    /**
     * Find zero or one CravingEvent that matches the filter.
     * @param {CravingEventFindUniqueArgs} args - Arguments to find a CravingEvent
     * @example
     * // Get one CravingEvent
     * const cravingEvent = await prisma.cravingEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CravingEventFindUniqueArgs>(args: SelectSubset<T, CravingEventFindUniqueArgs<ExtArgs>>): Prisma__CravingEventClient<$Result.GetResult<Prisma.$CravingEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CravingEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CravingEventFindUniqueOrThrowArgs} args - Arguments to find a CravingEvent
     * @example
     * // Get one CravingEvent
     * const cravingEvent = await prisma.cravingEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CravingEventFindUniqueOrThrowArgs>(args: SelectSubset<T, CravingEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CravingEventClient<$Result.GetResult<Prisma.$CravingEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CravingEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CravingEventFindFirstArgs} args - Arguments to find a CravingEvent
     * @example
     * // Get one CravingEvent
     * const cravingEvent = await prisma.cravingEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CravingEventFindFirstArgs>(args?: SelectSubset<T, CravingEventFindFirstArgs<ExtArgs>>): Prisma__CravingEventClient<$Result.GetResult<Prisma.$CravingEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CravingEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CravingEventFindFirstOrThrowArgs} args - Arguments to find a CravingEvent
     * @example
     * // Get one CravingEvent
     * const cravingEvent = await prisma.cravingEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CravingEventFindFirstOrThrowArgs>(args?: SelectSubset<T, CravingEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__CravingEventClient<$Result.GetResult<Prisma.$CravingEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CravingEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CravingEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CravingEvents
     * const cravingEvents = await prisma.cravingEvent.findMany()
     * 
     * // Get first 10 CravingEvents
     * const cravingEvents = await prisma.cravingEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cravingEventWithIdOnly = await prisma.cravingEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CravingEventFindManyArgs>(args?: SelectSubset<T, CravingEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CravingEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CravingEvent.
     * @param {CravingEventCreateArgs} args - Arguments to create a CravingEvent.
     * @example
     * // Create one CravingEvent
     * const CravingEvent = await prisma.cravingEvent.create({
     *   data: {
     *     // ... data to create a CravingEvent
     *   }
     * })
     * 
     */
    create<T extends CravingEventCreateArgs>(args: SelectSubset<T, CravingEventCreateArgs<ExtArgs>>): Prisma__CravingEventClient<$Result.GetResult<Prisma.$CravingEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CravingEvents.
     * @param {CravingEventCreateManyArgs} args - Arguments to create many CravingEvents.
     * @example
     * // Create many CravingEvents
     * const cravingEvent = await prisma.cravingEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CravingEventCreateManyArgs>(args?: SelectSubset<T, CravingEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CravingEvents and returns the data saved in the database.
     * @param {CravingEventCreateManyAndReturnArgs} args - Arguments to create many CravingEvents.
     * @example
     * // Create many CravingEvents
     * const cravingEvent = await prisma.cravingEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CravingEvents and only return the `id`
     * const cravingEventWithIdOnly = await prisma.cravingEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CravingEventCreateManyAndReturnArgs>(args?: SelectSubset<T, CravingEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CravingEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CravingEvent.
     * @param {CravingEventDeleteArgs} args - Arguments to delete one CravingEvent.
     * @example
     * // Delete one CravingEvent
     * const CravingEvent = await prisma.cravingEvent.delete({
     *   where: {
     *     // ... filter to delete one CravingEvent
     *   }
     * })
     * 
     */
    delete<T extends CravingEventDeleteArgs>(args: SelectSubset<T, CravingEventDeleteArgs<ExtArgs>>): Prisma__CravingEventClient<$Result.GetResult<Prisma.$CravingEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CravingEvent.
     * @param {CravingEventUpdateArgs} args - Arguments to update one CravingEvent.
     * @example
     * // Update one CravingEvent
     * const cravingEvent = await prisma.cravingEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CravingEventUpdateArgs>(args: SelectSubset<T, CravingEventUpdateArgs<ExtArgs>>): Prisma__CravingEventClient<$Result.GetResult<Prisma.$CravingEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CravingEvents.
     * @param {CravingEventDeleteManyArgs} args - Arguments to filter CravingEvents to delete.
     * @example
     * // Delete a few CravingEvents
     * const { count } = await prisma.cravingEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CravingEventDeleteManyArgs>(args?: SelectSubset<T, CravingEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CravingEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CravingEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CravingEvents
     * const cravingEvent = await prisma.cravingEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CravingEventUpdateManyArgs>(args: SelectSubset<T, CravingEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CravingEvents and returns the data updated in the database.
     * @param {CravingEventUpdateManyAndReturnArgs} args - Arguments to update many CravingEvents.
     * @example
     * // Update many CravingEvents
     * const cravingEvent = await prisma.cravingEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CravingEvents and only return the `id`
     * const cravingEventWithIdOnly = await prisma.cravingEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CravingEventUpdateManyAndReturnArgs>(args: SelectSubset<T, CravingEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CravingEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CravingEvent.
     * @param {CravingEventUpsertArgs} args - Arguments to update or create a CravingEvent.
     * @example
     * // Update or create a CravingEvent
     * const cravingEvent = await prisma.cravingEvent.upsert({
     *   create: {
     *     // ... data to create a CravingEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CravingEvent we want to update
     *   }
     * })
     */
    upsert<T extends CravingEventUpsertArgs>(args: SelectSubset<T, CravingEventUpsertArgs<ExtArgs>>): Prisma__CravingEventClient<$Result.GetResult<Prisma.$CravingEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CravingEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CravingEventCountArgs} args - Arguments to filter CravingEvents to count.
     * @example
     * // Count the number of CravingEvents
     * const count = await prisma.cravingEvent.count({
     *   where: {
     *     // ... the filter for the CravingEvents we want to count
     *   }
     * })
    **/
    count<T extends CravingEventCountArgs>(
      args?: Subset<T, CravingEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CravingEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CravingEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CravingEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CravingEventAggregateArgs>(args: Subset<T, CravingEventAggregateArgs>): Prisma.PrismaPromise<GetCravingEventAggregateType<T>>

    /**
     * Group by CravingEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CravingEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CravingEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CravingEventGroupByArgs['orderBy'] }
        : { orderBy?: CravingEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CravingEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCravingEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CravingEvent model
   */
  readonly fields: CravingEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CravingEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CravingEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    type<T extends CravingEvent$typeArgs<ExtArgs> = {}>(args?: Subset<T, CravingEvent$typeArgs<ExtArgs>>): Prisma__CravingTypeClient<$Result.GetResult<Prisma.$CravingTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CravingEvent model
   */
  interface CravingEventFieldRefs {
    readonly id: FieldRef<"CravingEvent", 'Int'>
    readonly createdAt: FieldRef<"CravingEvent", 'DateTime'>
    readonly intensity: FieldRef<"CravingEvent", 'Int'>
    readonly notes: FieldRef<"CravingEvent", 'String'>
    readonly resolved: FieldRef<"CravingEvent", 'Boolean'>
    readonly typeId: FieldRef<"CravingEvent", 'Int'>
    readonly userId: FieldRef<"CravingEvent", 'String'>
    readonly resolvedAt: FieldRef<"CravingEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CravingEvent findUnique
   */
  export type CravingEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingEvent
     */
    select?: CravingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingEvent
     */
    omit?: CravingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingEventInclude<ExtArgs> | null
    /**
     * Filter, which CravingEvent to fetch.
     */
    where: CravingEventWhereUniqueInput
  }

  /**
   * CravingEvent findUniqueOrThrow
   */
  export type CravingEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingEvent
     */
    select?: CravingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingEvent
     */
    omit?: CravingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingEventInclude<ExtArgs> | null
    /**
     * Filter, which CravingEvent to fetch.
     */
    where: CravingEventWhereUniqueInput
  }

  /**
   * CravingEvent findFirst
   */
  export type CravingEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingEvent
     */
    select?: CravingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingEvent
     */
    omit?: CravingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingEventInclude<ExtArgs> | null
    /**
     * Filter, which CravingEvent to fetch.
     */
    where?: CravingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CravingEvents to fetch.
     */
    orderBy?: CravingEventOrderByWithRelationInput | CravingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CravingEvents.
     */
    cursor?: CravingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CravingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CravingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CravingEvents.
     */
    distinct?: CravingEventScalarFieldEnum | CravingEventScalarFieldEnum[]
  }

  /**
   * CravingEvent findFirstOrThrow
   */
  export type CravingEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingEvent
     */
    select?: CravingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingEvent
     */
    omit?: CravingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingEventInclude<ExtArgs> | null
    /**
     * Filter, which CravingEvent to fetch.
     */
    where?: CravingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CravingEvents to fetch.
     */
    orderBy?: CravingEventOrderByWithRelationInput | CravingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CravingEvents.
     */
    cursor?: CravingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CravingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CravingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CravingEvents.
     */
    distinct?: CravingEventScalarFieldEnum | CravingEventScalarFieldEnum[]
  }

  /**
   * CravingEvent findMany
   */
  export type CravingEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingEvent
     */
    select?: CravingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingEvent
     */
    omit?: CravingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingEventInclude<ExtArgs> | null
    /**
     * Filter, which CravingEvents to fetch.
     */
    where?: CravingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CravingEvents to fetch.
     */
    orderBy?: CravingEventOrderByWithRelationInput | CravingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CravingEvents.
     */
    cursor?: CravingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CravingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CravingEvents.
     */
    skip?: number
    distinct?: CravingEventScalarFieldEnum | CravingEventScalarFieldEnum[]
  }

  /**
   * CravingEvent create
   */
  export type CravingEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingEvent
     */
    select?: CravingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingEvent
     */
    omit?: CravingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingEventInclude<ExtArgs> | null
    /**
     * The data needed to create a CravingEvent.
     */
    data: XOR<CravingEventCreateInput, CravingEventUncheckedCreateInput>
  }

  /**
   * CravingEvent createMany
   */
  export type CravingEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CravingEvents.
     */
    data: CravingEventCreateManyInput | CravingEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CravingEvent createManyAndReturn
   */
  export type CravingEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingEvent
     */
    select?: CravingEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CravingEvent
     */
    omit?: CravingEventOmit<ExtArgs> | null
    /**
     * The data used to create many CravingEvents.
     */
    data: CravingEventCreateManyInput | CravingEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CravingEvent update
   */
  export type CravingEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingEvent
     */
    select?: CravingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingEvent
     */
    omit?: CravingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingEventInclude<ExtArgs> | null
    /**
     * The data needed to update a CravingEvent.
     */
    data: XOR<CravingEventUpdateInput, CravingEventUncheckedUpdateInput>
    /**
     * Choose, which CravingEvent to update.
     */
    where: CravingEventWhereUniqueInput
  }

  /**
   * CravingEvent updateMany
   */
  export type CravingEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CravingEvents.
     */
    data: XOR<CravingEventUpdateManyMutationInput, CravingEventUncheckedUpdateManyInput>
    /**
     * Filter which CravingEvents to update
     */
    where?: CravingEventWhereInput
    /**
     * Limit how many CravingEvents to update.
     */
    limit?: number
  }

  /**
   * CravingEvent updateManyAndReturn
   */
  export type CravingEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingEvent
     */
    select?: CravingEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CravingEvent
     */
    omit?: CravingEventOmit<ExtArgs> | null
    /**
     * The data used to update CravingEvents.
     */
    data: XOR<CravingEventUpdateManyMutationInput, CravingEventUncheckedUpdateManyInput>
    /**
     * Filter which CravingEvents to update
     */
    where?: CravingEventWhereInput
    /**
     * Limit how many CravingEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CravingEvent upsert
   */
  export type CravingEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingEvent
     */
    select?: CravingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingEvent
     */
    omit?: CravingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingEventInclude<ExtArgs> | null
    /**
     * The filter to search for the CravingEvent to update in case it exists.
     */
    where: CravingEventWhereUniqueInput
    /**
     * In case the CravingEvent found by the `where` argument doesn't exist, create a new CravingEvent with this data.
     */
    create: XOR<CravingEventCreateInput, CravingEventUncheckedCreateInput>
    /**
     * In case the CravingEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CravingEventUpdateInput, CravingEventUncheckedUpdateInput>
  }

  /**
   * CravingEvent delete
   */
  export type CravingEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingEvent
     */
    select?: CravingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingEvent
     */
    omit?: CravingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingEventInclude<ExtArgs> | null
    /**
     * Filter which CravingEvent to delete.
     */
    where: CravingEventWhereUniqueInput
  }

  /**
   * CravingEvent deleteMany
   */
  export type CravingEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CravingEvents to delete
     */
    where?: CravingEventWhereInput
    /**
     * Limit how many CravingEvents to delete.
     */
    limit?: number
  }

  /**
   * CravingEvent.type
   */
  export type CravingEvent$typeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingType
     */
    select?: CravingTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingType
     */
    omit?: CravingTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingTypeInclude<ExtArgs> | null
    where?: CravingTypeWhereInput
  }

  /**
   * CravingEvent without action
   */
  export type CravingEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CravingEvent
     */
    select?: CravingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CravingEvent
     */
    omit?: CravingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CravingEventInclude<ExtArgs> | null
  }


  /**
   * Model UserProgress
   */

  export type AggregateUserProgress = {
    _count: UserProgressCountAggregateOutputType | null
    _avg: UserProgressAvgAggregateOutputType | null
    _sum: UserProgressSumAggregateOutputType | null
    _min: UserProgressMinAggregateOutputType | null
    _max: UserProgressMaxAggregateOutputType | null
  }

  export type UserProgressAvgAggregateOutputType = {
    id: number | null
    xp: number | null
    level: number | null
  }

  export type UserProgressSumAggregateOutputType = {
    id: number | null
    xp: number | null
    level: number | null
  }

  export type UserProgressMinAggregateOutputType = {
    id: number | null
    userId: string | null
    xp: number | null
    level: number | null
  }

  export type UserProgressMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    xp: number | null
    level: number | null
  }

  export type UserProgressCountAggregateOutputType = {
    id: number
    userId: number
    xp: number
    level: number
    _all: number
  }


  export type UserProgressAvgAggregateInputType = {
    id?: true
    xp?: true
    level?: true
  }

  export type UserProgressSumAggregateInputType = {
    id?: true
    xp?: true
    level?: true
  }

  export type UserProgressMinAggregateInputType = {
    id?: true
    userId?: true
    xp?: true
    level?: true
  }

  export type UserProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    xp?: true
    level?: true
  }

  export type UserProgressCountAggregateInputType = {
    id?: true
    userId?: true
    xp?: true
    level?: true
    _all?: true
  }

  export type UserProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProgress to aggregate.
     */
    where?: UserProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProgresses to fetch.
     */
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProgresses
    **/
    _count?: true | UserProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProgressMaxAggregateInputType
  }

  export type GetUserProgressAggregateType<T extends UserProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProgress[P]>
      : GetScalarType<T[P], AggregateUserProgress[P]>
  }




  export type UserProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProgressWhereInput
    orderBy?: UserProgressOrderByWithAggregationInput | UserProgressOrderByWithAggregationInput[]
    by: UserProgressScalarFieldEnum[] | UserProgressScalarFieldEnum
    having?: UserProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProgressCountAggregateInputType | true
    _avg?: UserProgressAvgAggregateInputType
    _sum?: UserProgressSumAggregateInputType
    _min?: UserProgressMinAggregateInputType
    _max?: UserProgressMaxAggregateInputType
  }

  export type UserProgressGroupByOutputType = {
    id: number
    userId: string
    xp: number
    level: number
    _count: UserProgressCountAggregateOutputType | null
    _avg: UserProgressAvgAggregateOutputType | null
    _sum: UserProgressSumAggregateOutputType | null
    _min: UserProgressMinAggregateOutputType | null
    _max: UserProgressMaxAggregateOutputType | null
  }

  type GetUserProgressGroupByPayload<T extends UserProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProgressGroupByOutputType[P]>
            : GetScalarType<T[P], UserProgressGroupByOutputType[P]>
        }
      >
    >


  export type UserProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    xp?: boolean
    level?: boolean
  }, ExtArgs["result"]["userProgress"]>

  export type UserProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    xp?: boolean
    level?: boolean
  }, ExtArgs["result"]["userProgress"]>

  export type UserProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    xp?: boolean
    level?: boolean
  }, ExtArgs["result"]["userProgress"]>

  export type UserProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    xp?: boolean
    level?: boolean
  }

  export type UserProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "xp" | "level", ExtArgs["result"]["userProgress"]>

  export type $UserProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProgress"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      xp: number
      level: number
    }, ExtArgs["result"]["userProgress"]>
    composites: {}
  }

  type UserProgressGetPayload<S extends boolean | null | undefined | UserProgressDefaultArgs> = $Result.GetResult<Prisma.$UserProgressPayload, S>

  type UserProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProgressCountAggregateInputType | true
    }

  export interface UserProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProgress'], meta: { name: 'UserProgress' } }
    /**
     * Find zero or one UserProgress that matches the filter.
     * @param {UserProgressFindUniqueArgs} args - Arguments to find a UserProgress
     * @example
     * // Get one UserProgress
     * const userProgress = await prisma.userProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProgressFindUniqueArgs>(args: SelectSubset<T, UserProgressFindUniqueArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProgressFindUniqueOrThrowArgs} args - Arguments to find a UserProgress
     * @example
     * // Get one UserProgress
     * const userProgress = await prisma.userProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressFindFirstArgs} args - Arguments to find a UserProgress
     * @example
     * // Get one UserProgress
     * const userProgress = await prisma.userProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProgressFindFirstArgs>(args?: SelectSubset<T, UserProgressFindFirstArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressFindFirstOrThrowArgs} args - Arguments to find a UserProgress
     * @example
     * // Get one UserProgress
     * const userProgress = await prisma.userProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProgresses
     * const userProgresses = await prisma.userProgress.findMany()
     * 
     * // Get first 10 UserProgresses
     * const userProgresses = await prisma.userProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userProgressWithIdOnly = await prisma.userProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserProgressFindManyArgs>(args?: SelectSubset<T, UserProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProgress.
     * @param {UserProgressCreateArgs} args - Arguments to create a UserProgress.
     * @example
     * // Create one UserProgress
     * const UserProgress = await prisma.userProgress.create({
     *   data: {
     *     // ... data to create a UserProgress
     *   }
     * })
     * 
     */
    create<T extends UserProgressCreateArgs>(args: SelectSubset<T, UserProgressCreateArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProgresses.
     * @param {UserProgressCreateManyArgs} args - Arguments to create many UserProgresses.
     * @example
     * // Create many UserProgresses
     * const userProgress = await prisma.userProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProgressCreateManyArgs>(args?: SelectSubset<T, UserProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserProgresses and returns the data saved in the database.
     * @param {UserProgressCreateManyAndReturnArgs} args - Arguments to create many UserProgresses.
     * @example
     * // Create many UserProgresses
     * const userProgress = await prisma.userProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserProgresses and only return the `id`
     * const userProgressWithIdOnly = await prisma.userProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, UserProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserProgress.
     * @param {UserProgressDeleteArgs} args - Arguments to delete one UserProgress.
     * @example
     * // Delete one UserProgress
     * const UserProgress = await prisma.userProgress.delete({
     *   where: {
     *     // ... filter to delete one UserProgress
     *   }
     * })
     * 
     */
    delete<T extends UserProgressDeleteArgs>(args: SelectSubset<T, UserProgressDeleteArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProgress.
     * @param {UserProgressUpdateArgs} args - Arguments to update one UserProgress.
     * @example
     * // Update one UserProgress
     * const userProgress = await prisma.userProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProgressUpdateArgs>(args: SelectSubset<T, UserProgressUpdateArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProgresses.
     * @param {UserProgressDeleteManyArgs} args - Arguments to filter UserProgresses to delete.
     * @example
     * // Delete a few UserProgresses
     * const { count } = await prisma.userProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProgressDeleteManyArgs>(args?: SelectSubset<T, UserProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProgresses
     * const userProgress = await prisma.userProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProgressUpdateManyArgs>(args: SelectSubset<T, UserProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProgresses and returns the data updated in the database.
     * @param {UserProgressUpdateManyAndReturnArgs} args - Arguments to update many UserProgresses.
     * @example
     * // Update many UserProgresses
     * const userProgress = await prisma.userProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserProgresses and only return the `id`
     * const userProgressWithIdOnly = await prisma.userProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, UserProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserProgress.
     * @param {UserProgressUpsertArgs} args - Arguments to update or create a UserProgress.
     * @example
     * // Update or create a UserProgress
     * const userProgress = await prisma.userProgress.upsert({
     *   create: {
     *     // ... data to create a UserProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProgress we want to update
     *   }
     * })
     */
    upsert<T extends UserProgressUpsertArgs>(args: SelectSubset<T, UserProgressUpsertArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressCountArgs} args - Arguments to filter UserProgresses to count.
     * @example
     * // Count the number of UserProgresses
     * const count = await prisma.userProgress.count({
     *   where: {
     *     // ... the filter for the UserProgresses we want to count
     *   }
     * })
    **/
    count<T extends UserProgressCountArgs>(
      args?: Subset<T, UserProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserProgressAggregateArgs>(args: Subset<T, UserProgressAggregateArgs>): Prisma.PrismaPromise<GetUserProgressAggregateType<T>>

    /**
     * Group by UserProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProgressGroupByArgs['orderBy'] }
        : { orderBy?: UserProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProgress model
   */
  readonly fields: UserProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProgress model
   */
  interface UserProgressFieldRefs {
    readonly id: FieldRef<"UserProgress", 'Int'>
    readonly userId: FieldRef<"UserProgress", 'String'>
    readonly xp: FieldRef<"UserProgress", 'Int'>
    readonly level: FieldRef<"UserProgress", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UserProgress findUnique
   */
  export type UserProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Filter, which UserProgress to fetch.
     */
    where: UserProgressWhereUniqueInput
  }

  /**
   * UserProgress findUniqueOrThrow
   */
  export type UserProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Filter, which UserProgress to fetch.
     */
    where: UserProgressWhereUniqueInput
  }

  /**
   * UserProgress findFirst
   */
  export type UserProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Filter, which UserProgress to fetch.
     */
    where?: UserProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProgresses to fetch.
     */
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProgresses.
     */
    cursor?: UserProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProgresses.
     */
    distinct?: UserProgressScalarFieldEnum | UserProgressScalarFieldEnum[]
  }

  /**
   * UserProgress findFirstOrThrow
   */
  export type UserProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Filter, which UserProgress to fetch.
     */
    where?: UserProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProgresses to fetch.
     */
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProgresses.
     */
    cursor?: UserProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProgresses.
     */
    distinct?: UserProgressScalarFieldEnum | UserProgressScalarFieldEnum[]
  }

  /**
   * UserProgress findMany
   */
  export type UserProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Filter, which UserProgresses to fetch.
     */
    where?: UserProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProgresses to fetch.
     */
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProgresses.
     */
    cursor?: UserProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProgresses.
     */
    skip?: number
    distinct?: UserProgressScalarFieldEnum | UserProgressScalarFieldEnum[]
  }

  /**
   * UserProgress create
   */
  export type UserProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * The data needed to create a UserProgress.
     */
    data: XOR<UserProgressCreateInput, UserProgressUncheckedCreateInput>
  }

  /**
   * UserProgress createMany
   */
  export type UserProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProgresses.
     */
    data: UserProgressCreateManyInput | UserProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProgress createManyAndReturn
   */
  export type UserProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * The data used to create many UserProgresses.
     */
    data: UserProgressCreateManyInput | UserProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProgress update
   */
  export type UserProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * The data needed to update a UserProgress.
     */
    data: XOR<UserProgressUpdateInput, UserProgressUncheckedUpdateInput>
    /**
     * Choose, which UserProgress to update.
     */
    where: UserProgressWhereUniqueInput
  }

  /**
   * UserProgress updateMany
   */
  export type UserProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProgresses.
     */
    data: XOR<UserProgressUpdateManyMutationInput, UserProgressUncheckedUpdateManyInput>
    /**
     * Filter which UserProgresses to update
     */
    where?: UserProgressWhereInput
    /**
     * Limit how many UserProgresses to update.
     */
    limit?: number
  }

  /**
   * UserProgress updateManyAndReturn
   */
  export type UserProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * The data used to update UserProgresses.
     */
    data: XOR<UserProgressUpdateManyMutationInput, UserProgressUncheckedUpdateManyInput>
    /**
     * Filter which UserProgresses to update
     */
    where?: UserProgressWhereInput
    /**
     * Limit how many UserProgresses to update.
     */
    limit?: number
  }

  /**
   * UserProgress upsert
   */
  export type UserProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * The filter to search for the UserProgress to update in case it exists.
     */
    where: UserProgressWhereUniqueInput
    /**
     * In case the UserProgress found by the `where` argument doesn't exist, create a new UserProgress with this data.
     */
    create: XOR<UserProgressCreateInput, UserProgressUncheckedCreateInput>
    /**
     * In case the UserProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProgressUpdateInput, UserProgressUncheckedUpdateInput>
  }

  /**
   * UserProgress delete
   */
  export type UserProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Filter which UserProgress to delete.
     */
    where: UserProgressWhereUniqueInput
  }

  /**
   * UserProgress deleteMany
   */
  export type UserProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProgresses to delete
     */
    where?: UserProgressWhereInput
    /**
     * Limit how many UserProgresses to delete.
     */
    limit?: number
  }

  /**
   * UserProgress without action
   */
  export type UserProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
  }


  /**
   * Model UserDailyCheckin
   */

  export type AggregateUserDailyCheckin = {
    _count: UserDailyCheckinCountAggregateOutputType | null
    _avg: UserDailyCheckinAvgAggregateOutputType | null
    _sum: UserDailyCheckinSumAggregateOutputType | null
    _min: UserDailyCheckinMinAggregateOutputType | null
    _max: UserDailyCheckinMaxAggregateOutputType | null
  }

  export type UserDailyCheckinAvgAggregateOutputType = {
    id: number | null
  }

  export type UserDailyCheckinSumAggregateOutputType = {
    id: number | null
  }

  export type UserDailyCheckinMinAggregateOutputType = {
    id: number | null
    userId: string | null
    date: Date | null
  }

  export type UserDailyCheckinMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    date: Date | null
  }

  export type UserDailyCheckinCountAggregateOutputType = {
    id: number
    userId: number
    date: number
    _all: number
  }


  export type UserDailyCheckinAvgAggregateInputType = {
    id?: true
  }

  export type UserDailyCheckinSumAggregateInputType = {
    id?: true
  }

  export type UserDailyCheckinMinAggregateInputType = {
    id?: true
    userId?: true
    date?: true
  }

  export type UserDailyCheckinMaxAggregateInputType = {
    id?: true
    userId?: true
    date?: true
  }

  export type UserDailyCheckinCountAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    _all?: true
  }

  export type UserDailyCheckinAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDailyCheckin to aggregate.
     */
    where?: UserDailyCheckinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDailyCheckins to fetch.
     */
    orderBy?: UserDailyCheckinOrderByWithRelationInput | UserDailyCheckinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserDailyCheckinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDailyCheckins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDailyCheckins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserDailyCheckins
    **/
    _count?: true | UserDailyCheckinCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserDailyCheckinAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserDailyCheckinSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserDailyCheckinMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserDailyCheckinMaxAggregateInputType
  }

  export type GetUserDailyCheckinAggregateType<T extends UserDailyCheckinAggregateArgs> = {
        [P in keyof T & keyof AggregateUserDailyCheckin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserDailyCheckin[P]>
      : GetScalarType<T[P], AggregateUserDailyCheckin[P]>
  }




  export type UserDailyCheckinGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDailyCheckinWhereInput
    orderBy?: UserDailyCheckinOrderByWithAggregationInput | UserDailyCheckinOrderByWithAggregationInput[]
    by: UserDailyCheckinScalarFieldEnum[] | UserDailyCheckinScalarFieldEnum
    having?: UserDailyCheckinScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserDailyCheckinCountAggregateInputType | true
    _avg?: UserDailyCheckinAvgAggregateInputType
    _sum?: UserDailyCheckinSumAggregateInputType
    _min?: UserDailyCheckinMinAggregateInputType
    _max?: UserDailyCheckinMaxAggregateInputType
  }

  export type UserDailyCheckinGroupByOutputType = {
    id: number
    userId: string
    date: Date
    _count: UserDailyCheckinCountAggregateOutputType | null
    _avg: UserDailyCheckinAvgAggregateOutputType | null
    _sum: UserDailyCheckinSumAggregateOutputType | null
    _min: UserDailyCheckinMinAggregateOutputType | null
    _max: UserDailyCheckinMaxAggregateOutputType | null
  }

  type GetUserDailyCheckinGroupByPayload<T extends UserDailyCheckinGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserDailyCheckinGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserDailyCheckinGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserDailyCheckinGroupByOutputType[P]>
            : GetScalarType<T[P], UserDailyCheckinGroupByOutputType[P]>
        }
      >
    >


  export type UserDailyCheckinSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
  }, ExtArgs["result"]["userDailyCheckin"]>

  export type UserDailyCheckinSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
  }, ExtArgs["result"]["userDailyCheckin"]>

  export type UserDailyCheckinSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
  }, ExtArgs["result"]["userDailyCheckin"]>

  export type UserDailyCheckinSelectScalar = {
    id?: boolean
    userId?: boolean
    date?: boolean
  }

  export type UserDailyCheckinOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "date", ExtArgs["result"]["userDailyCheckin"]>

  export type $UserDailyCheckinPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserDailyCheckin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      date: Date
    }, ExtArgs["result"]["userDailyCheckin"]>
    composites: {}
  }

  type UserDailyCheckinGetPayload<S extends boolean | null | undefined | UserDailyCheckinDefaultArgs> = $Result.GetResult<Prisma.$UserDailyCheckinPayload, S>

  type UserDailyCheckinCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserDailyCheckinFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserDailyCheckinCountAggregateInputType | true
    }

  export interface UserDailyCheckinDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserDailyCheckin'], meta: { name: 'UserDailyCheckin' } }
    /**
     * Find zero or one UserDailyCheckin that matches the filter.
     * @param {UserDailyCheckinFindUniqueArgs} args - Arguments to find a UserDailyCheckin
     * @example
     * // Get one UserDailyCheckin
     * const userDailyCheckin = await prisma.userDailyCheckin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserDailyCheckinFindUniqueArgs>(args: SelectSubset<T, UserDailyCheckinFindUniqueArgs<ExtArgs>>): Prisma__UserDailyCheckinClient<$Result.GetResult<Prisma.$UserDailyCheckinPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserDailyCheckin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserDailyCheckinFindUniqueOrThrowArgs} args - Arguments to find a UserDailyCheckin
     * @example
     * // Get one UserDailyCheckin
     * const userDailyCheckin = await prisma.userDailyCheckin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserDailyCheckinFindUniqueOrThrowArgs>(args: SelectSubset<T, UserDailyCheckinFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserDailyCheckinClient<$Result.GetResult<Prisma.$UserDailyCheckinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDailyCheckin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDailyCheckinFindFirstArgs} args - Arguments to find a UserDailyCheckin
     * @example
     * // Get one UserDailyCheckin
     * const userDailyCheckin = await prisma.userDailyCheckin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserDailyCheckinFindFirstArgs>(args?: SelectSubset<T, UserDailyCheckinFindFirstArgs<ExtArgs>>): Prisma__UserDailyCheckinClient<$Result.GetResult<Prisma.$UserDailyCheckinPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDailyCheckin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDailyCheckinFindFirstOrThrowArgs} args - Arguments to find a UserDailyCheckin
     * @example
     * // Get one UserDailyCheckin
     * const userDailyCheckin = await prisma.userDailyCheckin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserDailyCheckinFindFirstOrThrowArgs>(args?: SelectSubset<T, UserDailyCheckinFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserDailyCheckinClient<$Result.GetResult<Prisma.$UserDailyCheckinPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserDailyCheckins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDailyCheckinFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserDailyCheckins
     * const userDailyCheckins = await prisma.userDailyCheckin.findMany()
     * 
     * // Get first 10 UserDailyCheckins
     * const userDailyCheckins = await prisma.userDailyCheckin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userDailyCheckinWithIdOnly = await prisma.userDailyCheckin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserDailyCheckinFindManyArgs>(args?: SelectSubset<T, UserDailyCheckinFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDailyCheckinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserDailyCheckin.
     * @param {UserDailyCheckinCreateArgs} args - Arguments to create a UserDailyCheckin.
     * @example
     * // Create one UserDailyCheckin
     * const UserDailyCheckin = await prisma.userDailyCheckin.create({
     *   data: {
     *     // ... data to create a UserDailyCheckin
     *   }
     * })
     * 
     */
    create<T extends UserDailyCheckinCreateArgs>(args: SelectSubset<T, UserDailyCheckinCreateArgs<ExtArgs>>): Prisma__UserDailyCheckinClient<$Result.GetResult<Prisma.$UserDailyCheckinPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserDailyCheckins.
     * @param {UserDailyCheckinCreateManyArgs} args - Arguments to create many UserDailyCheckins.
     * @example
     * // Create many UserDailyCheckins
     * const userDailyCheckin = await prisma.userDailyCheckin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserDailyCheckinCreateManyArgs>(args?: SelectSubset<T, UserDailyCheckinCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserDailyCheckins and returns the data saved in the database.
     * @param {UserDailyCheckinCreateManyAndReturnArgs} args - Arguments to create many UserDailyCheckins.
     * @example
     * // Create many UserDailyCheckins
     * const userDailyCheckin = await prisma.userDailyCheckin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserDailyCheckins and only return the `id`
     * const userDailyCheckinWithIdOnly = await prisma.userDailyCheckin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserDailyCheckinCreateManyAndReturnArgs>(args?: SelectSubset<T, UserDailyCheckinCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDailyCheckinPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserDailyCheckin.
     * @param {UserDailyCheckinDeleteArgs} args - Arguments to delete one UserDailyCheckin.
     * @example
     * // Delete one UserDailyCheckin
     * const UserDailyCheckin = await prisma.userDailyCheckin.delete({
     *   where: {
     *     // ... filter to delete one UserDailyCheckin
     *   }
     * })
     * 
     */
    delete<T extends UserDailyCheckinDeleteArgs>(args: SelectSubset<T, UserDailyCheckinDeleteArgs<ExtArgs>>): Prisma__UserDailyCheckinClient<$Result.GetResult<Prisma.$UserDailyCheckinPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserDailyCheckin.
     * @param {UserDailyCheckinUpdateArgs} args - Arguments to update one UserDailyCheckin.
     * @example
     * // Update one UserDailyCheckin
     * const userDailyCheckin = await prisma.userDailyCheckin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserDailyCheckinUpdateArgs>(args: SelectSubset<T, UserDailyCheckinUpdateArgs<ExtArgs>>): Prisma__UserDailyCheckinClient<$Result.GetResult<Prisma.$UserDailyCheckinPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserDailyCheckins.
     * @param {UserDailyCheckinDeleteManyArgs} args - Arguments to filter UserDailyCheckins to delete.
     * @example
     * // Delete a few UserDailyCheckins
     * const { count } = await prisma.userDailyCheckin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDailyCheckinDeleteManyArgs>(args?: SelectSubset<T, UserDailyCheckinDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDailyCheckins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDailyCheckinUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserDailyCheckins
     * const userDailyCheckin = await prisma.userDailyCheckin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserDailyCheckinUpdateManyArgs>(args: SelectSubset<T, UserDailyCheckinUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDailyCheckins and returns the data updated in the database.
     * @param {UserDailyCheckinUpdateManyAndReturnArgs} args - Arguments to update many UserDailyCheckins.
     * @example
     * // Update many UserDailyCheckins
     * const userDailyCheckin = await prisma.userDailyCheckin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserDailyCheckins and only return the `id`
     * const userDailyCheckinWithIdOnly = await prisma.userDailyCheckin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserDailyCheckinUpdateManyAndReturnArgs>(args: SelectSubset<T, UserDailyCheckinUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDailyCheckinPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserDailyCheckin.
     * @param {UserDailyCheckinUpsertArgs} args - Arguments to update or create a UserDailyCheckin.
     * @example
     * // Update or create a UserDailyCheckin
     * const userDailyCheckin = await prisma.userDailyCheckin.upsert({
     *   create: {
     *     // ... data to create a UserDailyCheckin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserDailyCheckin we want to update
     *   }
     * })
     */
    upsert<T extends UserDailyCheckinUpsertArgs>(args: SelectSubset<T, UserDailyCheckinUpsertArgs<ExtArgs>>): Prisma__UserDailyCheckinClient<$Result.GetResult<Prisma.$UserDailyCheckinPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserDailyCheckins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDailyCheckinCountArgs} args - Arguments to filter UserDailyCheckins to count.
     * @example
     * // Count the number of UserDailyCheckins
     * const count = await prisma.userDailyCheckin.count({
     *   where: {
     *     // ... the filter for the UserDailyCheckins we want to count
     *   }
     * })
    **/
    count<T extends UserDailyCheckinCountArgs>(
      args?: Subset<T, UserDailyCheckinCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserDailyCheckinCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserDailyCheckin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDailyCheckinAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserDailyCheckinAggregateArgs>(args: Subset<T, UserDailyCheckinAggregateArgs>): Prisma.PrismaPromise<GetUserDailyCheckinAggregateType<T>>

    /**
     * Group by UserDailyCheckin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDailyCheckinGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserDailyCheckinGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserDailyCheckinGroupByArgs['orderBy'] }
        : { orderBy?: UserDailyCheckinGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserDailyCheckinGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserDailyCheckinGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserDailyCheckin model
   */
  readonly fields: UserDailyCheckinFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserDailyCheckin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserDailyCheckinClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserDailyCheckin model
   */
  interface UserDailyCheckinFieldRefs {
    readonly id: FieldRef<"UserDailyCheckin", 'Int'>
    readonly userId: FieldRef<"UserDailyCheckin", 'String'>
    readonly date: FieldRef<"UserDailyCheckin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserDailyCheckin findUnique
   */
  export type UserDailyCheckinFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDailyCheckin
     */
    select?: UserDailyCheckinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDailyCheckin
     */
    omit?: UserDailyCheckinOmit<ExtArgs> | null
    /**
     * Filter, which UserDailyCheckin to fetch.
     */
    where: UserDailyCheckinWhereUniqueInput
  }

  /**
   * UserDailyCheckin findUniqueOrThrow
   */
  export type UserDailyCheckinFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDailyCheckin
     */
    select?: UserDailyCheckinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDailyCheckin
     */
    omit?: UserDailyCheckinOmit<ExtArgs> | null
    /**
     * Filter, which UserDailyCheckin to fetch.
     */
    where: UserDailyCheckinWhereUniqueInput
  }

  /**
   * UserDailyCheckin findFirst
   */
  export type UserDailyCheckinFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDailyCheckin
     */
    select?: UserDailyCheckinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDailyCheckin
     */
    omit?: UserDailyCheckinOmit<ExtArgs> | null
    /**
     * Filter, which UserDailyCheckin to fetch.
     */
    where?: UserDailyCheckinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDailyCheckins to fetch.
     */
    orderBy?: UserDailyCheckinOrderByWithRelationInput | UserDailyCheckinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDailyCheckins.
     */
    cursor?: UserDailyCheckinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDailyCheckins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDailyCheckins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDailyCheckins.
     */
    distinct?: UserDailyCheckinScalarFieldEnum | UserDailyCheckinScalarFieldEnum[]
  }

  /**
   * UserDailyCheckin findFirstOrThrow
   */
  export type UserDailyCheckinFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDailyCheckin
     */
    select?: UserDailyCheckinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDailyCheckin
     */
    omit?: UserDailyCheckinOmit<ExtArgs> | null
    /**
     * Filter, which UserDailyCheckin to fetch.
     */
    where?: UserDailyCheckinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDailyCheckins to fetch.
     */
    orderBy?: UserDailyCheckinOrderByWithRelationInput | UserDailyCheckinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDailyCheckins.
     */
    cursor?: UserDailyCheckinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDailyCheckins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDailyCheckins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDailyCheckins.
     */
    distinct?: UserDailyCheckinScalarFieldEnum | UserDailyCheckinScalarFieldEnum[]
  }

  /**
   * UserDailyCheckin findMany
   */
  export type UserDailyCheckinFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDailyCheckin
     */
    select?: UserDailyCheckinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDailyCheckin
     */
    omit?: UserDailyCheckinOmit<ExtArgs> | null
    /**
     * Filter, which UserDailyCheckins to fetch.
     */
    where?: UserDailyCheckinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDailyCheckins to fetch.
     */
    orderBy?: UserDailyCheckinOrderByWithRelationInput | UserDailyCheckinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserDailyCheckins.
     */
    cursor?: UserDailyCheckinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDailyCheckins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDailyCheckins.
     */
    skip?: number
    distinct?: UserDailyCheckinScalarFieldEnum | UserDailyCheckinScalarFieldEnum[]
  }

  /**
   * UserDailyCheckin create
   */
  export type UserDailyCheckinCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDailyCheckin
     */
    select?: UserDailyCheckinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDailyCheckin
     */
    omit?: UserDailyCheckinOmit<ExtArgs> | null
    /**
     * The data needed to create a UserDailyCheckin.
     */
    data: XOR<UserDailyCheckinCreateInput, UserDailyCheckinUncheckedCreateInput>
  }

  /**
   * UserDailyCheckin createMany
   */
  export type UserDailyCheckinCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserDailyCheckins.
     */
    data: UserDailyCheckinCreateManyInput | UserDailyCheckinCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserDailyCheckin createManyAndReturn
   */
  export type UserDailyCheckinCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDailyCheckin
     */
    select?: UserDailyCheckinSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserDailyCheckin
     */
    omit?: UserDailyCheckinOmit<ExtArgs> | null
    /**
     * The data used to create many UserDailyCheckins.
     */
    data: UserDailyCheckinCreateManyInput | UserDailyCheckinCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserDailyCheckin update
   */
  export type UserDailyCheckinUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDailyCheckin
     */
    select?: UserDailyCheckinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDailyCheckin
     */
    omit?: UserDailyCheckinOmit<ExtArgs> | null
    /**
     * The data needed to update a UserDailyCheckin.
     */
    data: XOR<UserDailyCheckinUpdateInput, UserDailyCheckinUncheckedUpdateInput>
    /**
     * Choose, which UserDailyCheckin to update.
     */
    where: UserDailyCheckinWhereUniqueInput
  }

  /**
   * UserDailyCheckin updateMany
   */
  export type UserDailyCheckinUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserDailyCheckins.
     */
    data: XOR<UserDailyCheckinUpdateManyMutationInput, UserDailyCheckinUncheckedUpdateManyInput>
    /**
     * Filter which UserDailyCheckins to update
     */
    where?: UserDailyCheckinWhereInput
    /**
     * Limit how many UserDailyCheckins to update.
     */
    limit?: number
  }

  /**
   * UserDailyCheckin updateManyAndReturn
   */
  export type UserDailyCheckinUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDailyCheckin
     */
    select?: UserDailyCheckinSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserDailyCheckin
     */
    omit?: UserDailyCheckinOmit<ExtArgs> | null
    /**
     * The data used to update UserDailyCheckins.
     */
    data: XOR<UserDailyCheckinUpdateManyMutationInput, UserDailyCheckinUncheckedUpdateManyInput>
    /**
     * Filter which UserDailyCheckins to update
     */
    where?: UserDailyCheckinWhereInput
    /**
     * Limit how many UserDailyCheckins to update.
     */
    limit?: number
  }

  /**
   * UserDailyCheckin upsert
   */
  export type UserDailyCheckinUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDailyCheckin
     */
    select?: UserDailyCheckinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDailyCheckin
     */
    omit?: UserDailyCheckinOmit<ExtArgs> | null
    /**
     * The filter to search for the UserDailyCheckin to update in case it exists.
     */
    where: UserDailyCheckinWhereUniqueInput
    /**
     * In case the UserDailyCheckin found by the `where` argument doesn't exist, create a new UserDailyCheckin with this data.
     */
    create: XOR<UserDailyCheckinCreateInput, UserDailyCheckinUncheckedCreateInput>
    /**
     * In case the UserDailyCheckin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserDailyCheckinUpdateInput, UserDailyCheckinUncheckedUpdateInput>
  }

  /**
   * UserDailyCheckin delete
   */
  export type UserDailyCheckinDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDailyCheckin
     */
    select?: UserDailyCheckinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDailyCheckin
     */
    omit?: UserDailyCheckinOmit<ExtArgs> | null
    /**
     * Filter which UserDailyCheckin to delete.
     */
    where: UserDailyCheckinWhereUniqueInput
  }

  /**
   * UserDailyCheckin deleteMany
   */
  export type UserDailyCheckinDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDailyCheckins to delete
     */
    where?: UserDailyCheckinWhereInput
    /**
     * Limit how many UserDailyCheckins to delete.
     */
    limit?: number
  }

  /**
   * UserDailyCheckin without action
   */
  export type UserDailyCheckinDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDailyCheckin
     */
    select?: UserDailyCheckinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDailyCheckin
     */
    omit?: UserDailyCheckinOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CravingTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    isCustom: 'isCustom',
    userId: 'userId'
  };

  export type CravingTypeScalarFieldEnum = (typeof CravingTypeScalarFieldEnum)[keyof typeof CravingTypeScalarFieldEnum]


  export const CravingEventScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    intensity: 'intensity',
    notes: 'notes',
    resolved: 'resolved',
    typeId: 'typeId',
    userId: 'userId',
    resolvedAt: 'resolvedAt'
  };

  export type CravingEventScalarFieldEnum = (typeof CravingEventScalarFieldEnum)[keyof typeof CravingEventScalarFieldEnum]


  export const UserProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    xp: 'xp',
    level: 'level'
  };

  export type UserProgressScalarFieldEnum = (typeof UserProgressScalarFieldEnum)[keyof typeof UserProgressScalarFieldEnum]


  export const UserDailyCheckinScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    date: 'date'
  };

  export type UserDailyCheckinScalarFieldEnum = (typeof UserDailyCheckinScalarFieldEnum)[keyof typeof UserDailyCheckinScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CravingTypeWhereInput = {
    AND?: CravingTypeWhereInput | CravingTypeWhereInput[]
    OR?: CravingTypeWhereInput[]
    NOT?: CravingTypeWhereInput | CravingTypeWhereInput[]
    id?: IntFilter<"CravingType"> | number
    name?: StringFilter<"CravingType"> | string
    isCustom?: BoolFilter<"CravingType"> | boolean
    userId?: StringNullableFilter<"CravingType"> | string | null
    events?: CravingEventListRelationFilter
  }

  export type CravingTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    isCustom?: SortOrder
    userId?: SortOrderInput | SortOrder
    events?: CravingEventOrderByRelationAggregateInput
  }

  export type CravingTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    name_userId?: CravingTypeNameUserIdCompoundUniqueInput
    AND?: CravingTypeWhereInput | CravingTypeWhereInput[]
    OR?: CravingTypeWhereInput[]
    NOT?: CravingTypeWhereInput | CravingTypeWhereInput[]
    isCustom?: BoolFilter<"CravingType"> | boolean
    userId?: StringNullableFilter<"CravingType"> | string | null
    events?: CravingEventListRelationFilter
  }, "id" | "name" | "name_userId">

  export type CravingTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    isCustom?: SortOrder
    userId?: SortOrderInput | SortOrder
    _count?: CravingTypeCountOrderByAggregateInput
    _avg?: CravingTypeAvgOrderByAggregateInput
    _max?: CravingTypeMaxOrderByAggregateInput
    _min?: CravingTypeMinOrderByAggregateInput
    _sum?: CravingTypeSumOrderByAggregateInput
  }

  export type CravingTypeScalarWhereWithAggregatesInput = {
    AND?: CravingTypeScalarWhereWithAggregatesInput | CravingTypeScalarWhereWithAggregatesInput[]
    OR?: CravingTypeScalarWhereWithAggregatesInput[]
    NOT?: CravingTypeScalarWhereWithAggregatesInput | CravingTypeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CravingType"> | number
    name?: StringWithAggregatesFilter<"CravingType"> | string
    isCustom?: BoolWithAggregatesFilter<"CravingType"> | boolean
    userId?: StringNullableWithAggregatesFilter<"CravingType"> | string | null
  }

  export type CravingEventWhereInput = {
    AND?: CravingEventWhereInput | CravingEventWhereInput[]
    OR?: CravingEventWhereInput[]
    NOT?: CravingEventWhereInput | CravingEventWhereInput[]
    id?: IntFilter<"CravingEvent"> | number
    createdAt?: DateTimeFilter<"CravingEvent"> | Date | string
    intensity?: IntNullableFilter<"CravingEvent"> | number | null
    notes?: StringNullableFilter<"CravingEvent"> | string | null
    resolved?: BoolFilter<"CravingEvent"> | boolean
    typeId?: IntNullableFilter<"CravingEvent"> | number | null
    userId?: StringFilter<"CravingEvent"> | string
    resolvedAt?: DateTimeNullableFilter<"CravingEvent"> | Date | string | null
    type?: XOR<CravingTypeNullableScalarRelationFilter, CravingTypeWhereInput> | null
  }

  export type CravingEventOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    intensity?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    resolved?: SortOrder
    typeId?: SortOrderInput | SortOrder
    userId?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    type?: CravingTypeOrderByWithRelationInput
  }

  export type CravingEventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CravingEventWhereInput | CravingEventWhereInput[]
    OR?: CravingEventWhereInput[]
    NOT?: CravingEventWhereInput | CravingEventWhereInput[]
    createdAt?: DateTimeFilter<"CravingEvent"> | Date | string
    intensity?: IntNullableFilter<"CravingEvent"> | number | null
    notes?: StringNullableFilter<"CravingEvent"> | string | null
    resolved?: BoolFilter<"CravingEvent"> | boolean
    typeId?: IntNullableFilter<"CravingEvent"> | number | null
    userId?: StringFilter<"CravingEvent"> | string
    resolvedAt?: DateTimeNullableFilter<"CravingEvent"> | Date | string | null
    type?: XOR<CravingTypeNullableScalarRelationFilter, CravingTypeWhereInput> | null
  }, "id">

  export type CravingEventOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    intensity?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    resolved?: SortOrder
    typeId?: SortOrderInput | SortOrder
    userId?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    _count?: CravingEventCountOrderByAggregateInput
    _avg?: CravingEventAvgOrderByAggregateInput
    _max?: CravingEventMaxOrderByAggregateInput
    _min?: CravingEventMinOrderByAggregateInput
    _sum?: CravingEventSumOrderByAggregateInput
  }

  export type CravingEventScalarWhereWithAggregatesInput = {
    AND?: CravingEventScalarWhereWithAggregatesInput | CravingEventScalarWhereWithAggregatesInput[]
    OR?: CravingEventScalarWhereWithAggregatesInput[]
    NOT?: CravingEventScalarWhereWithAggregatesInput | CravingEventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CravingEvent"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CravingEvent"> | Date | string
    intensity?: IntNullableWithAggregatesFilter<"CravingEvent"> | number | null
    notes?: StringNullableWithAggregatesFilter<"CravingEvent"> | string | null
    resolved?: BoolWithAggregatesFilter<"CravingEvent"> | boolean
    typeId?: IntNullableWithAggregatesFilter<"CravingEvent"> | number | null
    userId?: StringWithAggregatesFilter<"CravingEvent"> | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"CravingEvent"> | Date | string | null
  }

  export type UserProgressWhereInput = {
    AND?: UserProgressWhereInput | UserProgressWhereInput[]
    OR?: UserProgressWhereInput[]
    NOT?: UserProgressWhereInput | UserProgressWhereInput[]
    id?: IntFilter<"UserProgress"> | number
    userId?: StringFilter<"UserProgress"> | string
    xp?: IntFilter<"UserProgress"> | number
    level?: IntFilter<"UserProgress"> | number
  }

  export type UserProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
  }

  export type UserProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: string
    AND?: UserProgressWhereInput | UserProgressWhereInput[]
    OR?: UserProgressWhereInput[]
    NOT?: UserProgressWhereInput | UserProgressWhereInput[]
    xp?: IntFilter<"UserProgress"> | number
    level?: IntFilter<"UserProgress"> | number
  }, "id" | "userId">

  export type UserProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    _count?: UserProgressCountOrderByAggregateInput
    _avg?: UserProgressAvgOrderByAggregateInput
    _max?: UserProgressMaxOrderByAggregateInput
    _min?: UserProgressMinOrderByAggregateInput
    _sum?: UserProgressSumOrderByAggregateInput
  }

  export type UserProgressScalarWhereWithAggregatesInput = {
    AND?: UserProgressScalarWhereWithAggregatesInput | UserProgressScalarWhereWithAggregatesInput[]
    OR?: UserProgressScalarWhereWithAggregatesInput[]
    NOT?: UserProgressScalarWhereWithAggregatesInput | UserProgressScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserProgress"> | number
    userId?: StringWithAggregatesFilter<"UserProgress"> | string
    xp?: IntWithAggregatesFilter<"UserProgress"> | number
    level?: IntWithAggregatesFilter<"UserProgress"> | number
  }

  export type UserDailyCheckinWhereInput = {
    AND?: UserDailyCheckinWhereInput | UserDailyCheckinWhereInput[]
    OR?: UserDailyCheckinWhereInput[]
    NOT?: UserDailyCheckinWhereInput | UserDailyCheckinWhereInput[]
    id?: IntFilter<"UserDailyCheckin"> | number
    userId?: StringFilter<"UserDailyCheckin"> | string
    date?: DateTimeFilter<"UserDailyCheckin"> | Date | string
  }

  export type UserDailyCheckinOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
  }

  export type UserDailyCheckinWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_date?: UserDailyCheckinUserIdDateCompoundUniqueInput
    AND?: UserDailyCheckinWhereInput | UserDailyCheckinWhereInput[]
    OR?: UserDailyCheckinWhereInput[]
    NOT?: UserDailyCheckinWhereInput | UserDailyCheckinWhereInput[]
    userId?: StringFilter<"UserDailyCheckin"> | string
    date?: DateTimeFilter<"UserDailyCheckin"> | Date | string
  }, "id" | "userId_date">

  export type UserDailyCheckinOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    _count?: UserDailyCheckinCountOrderByAggregateInput
    _avg?: UserDailyCheckinAvgOrderByAggregateInput
    _max?: UserDailyCheckinMaxOrderByAggregateInput
    _min?: UserDailyCheckinMinOrderByAggregateInput
    _sum?: UserDailyCheckinSumOrderByAggregateInput
  }

  export type UserDailyCheckinScalarWhereWithAggregatesInput = {
    AND?: UserDailyCheckinScalarWhereWithAggregatesInput | UserDailyCheckinScalarWhereWithAggregatesInput[]
    OR?: UserDailyCheckinScalarWhereWithAggregatesInput[]
    NOT?: UserDailyCheckinScalarWhereWithAggregatesInput | UserDailyCheckinScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserDailyCheckin"> | number
    userId?: StringWithAggregatesFilter<"UserDailyCheckin"> | string
    date?: DateTimeWithAggregatesFilter<"UserDailyCheckin"> | Date | string
  }

  export type CravingTypeCreateInput = {
    name: string
    isCustom?: boolean
    userId?: string | null
    events?: CravingEventCreateNestedManyWithoutTypeInput
  }

  export type CravingTypeUncheckedCreateInput = {
    id?: number
    name: string
    isCustom?: boolean
    userId?: string | null
    events?: CravingEventUncheckedCreateNestedManyWithoutTypeInput
  }

  export type CravingTypeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    events?: CravingEventUpdateManyWithoutTypeNestedInput
  }

  export type CravingTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    events?: CravingEventUncheckedUpdateManyWithoutTypeNestedInput
  }

  export type CravingTypeCreateManyInput = {
    id?: number
    name: string
    isCustom?: boolean
    userId?: string | null
  }

  export type CravingTypeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CravingTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CravingEventCreateInput = {
    createdAt?: Date | string
    intensity?: number | null
    notes?: string | null
    resolved: boolean
    userId: string
    resolvedAt?: Date | string | null
    type?: CravingTypeCreateNestedOneWithoutEventsInput
  }

  export type CravingEventUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    intensity?: number | null
    notes?: string | null
    resolved: boolean
    typeId?: number | null
    userId: string
    resolvedAt?: Date | string | null
  }

  export type CravingEventUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    intensity?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    resolved?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    type?: CravingTypeUpdateOneWithoutEventsNestedInput
  }

  export type CravingEventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    intensity?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    resolved?: BoolFieldUpdateOperationsInput | boolean
    typeId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CravingEventCreateManyInput = {
    id?: number
    createdAt?: Date | string
    intensity?: number | null
    notes?: string | null
    resolved: boolean
    typeId?: number | null
    userId: string
    resolvedAt?: Date | string | null
  }

  export type CravingEventUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    intensity?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    resolved?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CravingEventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    intensity?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    resolved?: BoolFieldUpdateOperationsInput | boolean
    typeId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserProgressCreateInput = {
    userId: string
    xp?: number
    level?: number
  }

  export type UserProgressUncheckedCreateInput = {
    id?: number
    userId: string
    xp?: number
    level?: number
  }

  export type UserProgressUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
  }

  export type UserProgressUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
  }

  export type UserProgressCreateManyInput = {
    id?: number
    userId: string
    xp?: number
    level?: number
  }

  export type UserProgressUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
  }

  export type UserProgressUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
  }

  export type UserDailyCheckinCreateInput = {
    userId: string
    date: Date | string
  }

  export type UserDailyCheckinUncheckedCreateInput = {
    id?: number
    userId: string
    date: Date | string
  }

  export type UserDailyCheckinUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDailyCheckinUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDailyCheckinCreateManyInput = {
    id?: number
    userId: string
    date: Date | string
  }

  export type UserDailyCheckinUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDailyCheckinUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type CravingEventListRelationFilter = {
    every?: CravingEventWhereInput
    some?: CravingEventWhereInput
    none?: CravingEventWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CravingEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CravingTypeNameUserIdCompoundUniqueInput = {
    name: string
    userId: string
  }

  export type CravingTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isCustom?: SortOrder
    userId?: SortOrder
  }

  export type CravingTypeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CravingTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isCustom?: SortOrder
    userId?: SortOrder
  }

  export type CravingTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isCustom?: SortOrder
    userId?: SortOrder
  }

  export type CravingTypeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CravingTypeNullableScalarRelationFilter = {
    is?: CravingTypeWhereInput | null
    isNot?: CravingTypeWhereInput | null
  }

  export type CravingEventCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    intensity?: SortOrder
    notes?: SortOrder
    resolved?: SortOrder
    typeId?: SortOrder
    userId?: SortOrder
    resolvedAt?: SortOrder
  }

  export type CravingEventAvgOrderByAggregateInput = {
    id?: SortOrder
    intensity?: SortOrder
    typeId?: SortOrder
  }

  export type CravingEventMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    intensity?: SortOrder
    notes?: SortOrder
    resolved?: SortOrder
    typeId?: SortOrder
    userId?: SortOrder
    resolvedAt?: SortOrder
  }

  export type CravingEventMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    intensity?: SortOrder
    notes?: SortOrder
    resolved?: SortOrder
    typeId?: SortOrder
    userId?: SortOrder
    resolvedAt?: SortOrder
  }

  export type CravingEventSumOrderByAggregateInput = {
    id?: SortOrder
    intensity?: SortOrder
    typeId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
  }

  export type UserProgressAvgOrderByAggregateInput = {
    id?: SortOrder
    xp?: SortOrder
    level?: SortOrder
  }

  export type UserProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
  }

  export type UserProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
  }

  export type UserProgressSumOrderByAggregateInput = {
    id?: SortOrder
    xp?: SortOrder
    level?: SortOrder
  }

  export type UserDailyCheckinUserIdDateCompoundUniqueInput = {
    userId: string
    date: Date | string
  }

  export type UserDailyCheckinCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
  }

  export type UserDailyCheckinAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserDailyCheckinMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
  }

  export type UserDailyCheckinMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
  }

  export type UserDailyCheckinSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CravingEventCreateNestedManyWithoutTypeInput = {
    create?: XOR<CravingEventCreateWithoutTypeInput, CravingEventUncheckedCreateWithoutTypeInput> | CravingEventCreateWithoutTypeInput[] | CravingEventUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: CravingEventCreateOrConnectWithoutTypeInput | CravingEventCreateOrConnectWithoutTypeInput[]
    createMany?: CravingEventCreateManyTypeInputEnvelope
    connect?: CravingEventWhereUniqueInput | CravingEventWhereUniqueInput[]
  }

  export type CravingEventUncheckedCreateNestedManyWithoutTypeInput = {
    create?: XOR<CravingEventCreateWithoutTypeInput, CravingEventUncheckedCreateWithoutTypeInput> | CravingEventCreateWithoutTypeInput[] | CravingEventUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: CravingEventCreateOrConnectWithoutTypeInput | CravingEventCreateOrConnectWithoutTypeInput[]
    createMany?: CravingEventCreateManyTypeInputEnvelope
    connect?: CravingEventWhereUniqueInput | CravingEventWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CravingEventUpdateManyWithoutTypeNestedInput = {
    create?: XOR<CravingEventCreateWithoutTypeInput, CravingEventUncheckedCreateWithoutTypeInput> | CravingEventCreateWithoutTypeInput[] | CravingEventUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: CravingEventCreateOrConnectWithoutTypeInput | CravingEventCreateOrConnectWithoutTypeInput[]
    upsert?: CravingEventUpsertWithWhereUniqueWithoutTypeInput | CravingEventUpsertWithWhereUniqueWithoutTypeInput[]
    createMany?: CravingEventCreateManyTypeInputEnvelope
    set?: CravingEventWhereUniqueInput | CravingEventWhereUniqueInput[]
    disconnect?: CravingEventWhereUniqueInput | CravingEventWhereUniqueInput[]
    delete?: CravingEventWhereUniqueInput | CravingEventWhereUniqueInput[]
    connect?: CravingEventWhereUniqueInput | CravingEventWhereUniqueInput[]
    update?: CravingEventUpdateWithWhereUniqueWithoutTypeInput | CravingEventUpdateWithWhereUniqueWithoutTypeInput[]
    updateMany?: CravingEventUpdateManyWithWhereWithoutTypeInput | CravingEventUpdateManyWithWhereWithoutTypeInput[]
    deleteMany?: CravingEventScalarWhereInput | CravingEventScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CravingEventUncheckedUpdateManyWithoutTypeNestedInput = {
    create?: XOR<CravingEventCreateWithoutTypeInput, CravingEventUncheckedCreateWithoutTypeInput> | CravingEventCreateWithoutTypeInput[] | CravingEventUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: CravingEventCreateOrConnectWithoutTypeInput | CravingEventCreateOrConnectWithoutTypeInput[]
    upsert?: CravingEventUpsertWithWhereUniqueWithoutTypeInput | CravingEventUpsertWithWhereUniqueWithoutTypeInput[]
    createMany?: CravingEventCreateManyTypeInputEnvelope
    set?: CravingEventWhereUniqueInput | CravingEventWhereUniqueInput[]
    disconnect?: CravingEventWhereUniqueInput | CravingEventWhereUniqueInput[]
    delete?: CravingEventWhereUniqueInput | CravingEventWhereUniqueInput[]
    connect?: CravingEventWhereUniqueInput | CravingEventWhereUniqueInput[]
    update?: CravingEventUpdateWithWhereUniqueWithoutTypeInput | CravingEventUpdateWithWhereUniqueWithoutTypeInput[]
    updateMany?: CravingEventUpdateManyWithWhereWithoutTypeInput | CravingEventUpdateManyWithWhereWithoutTypeInput[]
    deleteMany?: CravingEventScalarWhereInput | CravingEventScalarWhereInput[]
  }

  export type CravingTypeCreateNestedOneWithoutEventsInput = {
    create?: XOR<CravingTypeCreateWithoutEventsInput, CravingTypeUncheckedCreateWithoutEventsInput>
    connectOrCreate?: CravingTypeCreateOrConnectWithoutEventsInput
    connect?: CravingTypeWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CravingTypeUpdateOneWithoutEventsNestedInput = {
    create?: XOR<CravingTypeCreateWithoutEventsInput, CravingTypeUncheckedCreateWithoutEventsInput>
    connectOrCreate?: CravingTypeCreateOrConnectWithoutEventsInput
    upsert?: CravingTypeUpsertWithoutEventsInput
    disconnect?: CravingTypeWhereInput | boolean
    delete?: CravingTypeWhereInput | boolean
    connect?: CravingTypeWhereUniqueInput
    update?: XOR<XOR<CravingTypeUpdateToOneWithWhereWithoutEventsInput, CravingTypeUpdateWithoutEventsInput>, CravingTypeUncheckedUpdateWithoutEventsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CravingEventCreateWithoutTypeInput = {
    createdAt?: Date | string
    intensity?: number | null
    notes?: string | null
    resolved: boolean
    userId: string
    resolvedAt?: Date | string | null
  }

  export type CravingEventUncheckedCreateWithoutTypeInput = {
    id?: number
    createdAt?: Date | string
    intensity?: number | null
    notes?: string | null
    resolved: boolean
    userId: string
    resolvedAt?: Date | string | null
  }

  export type CravingEventCreateOrConnectWithoutTypeInput = {
    where: CravingEventWhereUniqueInput
    create: XOR<CravingEventCreateWithoutTypeInput, CravingEventUncheckedCreateWithoutTypeInput>
  }

  export type CravingEventCreateManyTypeInputEnvelope = {
    data: CravingEventCreateManyTypeInput | CravingEventCreateManyTypeInput[]
    skipDuplicates?: boolean
  }

  export type CravingEventUpsertWithWhereUniqueWithoutTypeInput = {
    where: CravingEventWhereUniqueInput
    update: XOR<CravingEventUpdateWithoutTypeInput, CravingEventUncheckedUpdateWithoutTypeInput>
    create: XOR<CravingEventCreateWithoutTypeInput, CravingEventUncheckedCreateWithoutTypeInput>
  }

  export type CravingEventUpdateWithWhereUniqueWithoutTypeInput = {
    where: CravingEventWhereUniqueInput
    data: XOR<CravingEventUpdateWithoutTypeInput, CravingEventUncheckedUpdateWithoutTypeInput>
  }

  export type CravingEventUpdateManyWithWhereWithoutTypeInput = {
    where: CravingEventScalarWhereInput
    data: XOR<CravingEventUpdateManyMutationInput, CravingEventUncheckedUpdateManyWithoutTypeInput>
  }

  export type CravingEventScalarWhereInput = {
    AND?: CravingEventScalarWhereInput | CravingEventScalarWhereInput[]
    OR?: CravingEventScalarWhereInput[]
    NOT?: CravingEventScalarWhereInput | CravingEventScalarWhereInput[]
    id?: IntFilter<"CravingEvent"> | number
    createdAt?: DateTimeFilter<"CravingEvent"> | Date | string
    intensity?: IntNullableFilter<"CravingEvent"> | number | null
    notes?: StringNullableFilter<"CravingEvent"> | string | null
    resolved?: BoolFilter<"CravingEvent"> | boolean
    typeId?: IntNullableFilter<"CravingEvent"> | number | null
    userId?: StringFilter<"CravingEvent"> | string
    resolvedAt?: DateTimeNullableFilter<"CravingEvent"> | Date | string | null
  }

  export type CravingTypeCreateWithoutEventsInput = {
    name: string
    isCustom?: boolean
    userId?: string | null
  }

  export type CravingTypeUncheckedCreateWithoutEventsInput = {
    id?: number
    name: string
    isCustom?: boolean
    userId?: string | null
  }

  export type CravingTypeCreateOrConnectWithoutEventsInput = {
    where: CravingTypeWhereUniqueInput
    create: XOR<CravingTypeCreateWithoutEventsInput, CravingTypeUncheckedCreateWithoutEventsInput>
  }

  export type CravingTypeUpsertWithoutEventsInput = {
    update: XOR<CravingTypeUpdateWithoutEventsInput, CravingTypeUncheckedUpdateWithoutEventsInput>
    create: XOR<CravingTypeCreateWithoutEventsInput, CravingTypeUncheckedCreateWithoutEventsInput>
    where?: CravingTypeWhereInput
  }

  export type CravingTypeUpdateToOneWithWhereWithoutEventsInput = {
    where?: CravingTypeWhereInput
    data: XOR<CravingTypeUpdateWithoutEventsInput, CravingTypeUncheckedUpdateWithoutEventsInput>
  }

  export type CravingTypeUpdateWithoutEventsInput = {
    name?: StringFieldUpdateOperationsInput | string
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CravingTypeUncheckedUpdateWithoutEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CravingEventCreateManyTypeInput = {
    id?: number
    createdAt?: Date | string
    intensity?: number | null
    notes?: string | null
    resolved: boolean
    userId: string
    resolvedAt?: Date | string | null
  }

  export type CravingEventUpdateWithoutTypeInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    intensity?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    resolved?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CravingEventUncheckedUpdateWithoutTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    intensity?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    resolved?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CravingEventUncheckedUpdateManyWithoutTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    intensity?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    resolved?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}