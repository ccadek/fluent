/**
 * Error that aggregates a number of other errors.
 * Reference: https://github.com/NaturalCycles/js-lib/blob/master/src/promise/AggregatedError.ts
 */
export class AggregatedError<RESULT = any> extends Error {
  errors!: Error[]
  results!: RESULT[]

  constructor(errors: Error[], results: RESULT[] = []) {
    const message = [
      `${errors.length} errors:`,
      ...errors.map((e, i) => `${i + 1}. ${e.message}`)
    ].join('\n')

    super(message)

    this.errors = errors
    this.results = results

    Object.defineProperty(this, 'name', {
      value: this.constructor.name,
      configurable: true
    })

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    } else {
      Object.defineProperty(this, 'stack', {
        value: new Error().stack, // eslint-disable-line unicorn/error-message
        writable: true,
        configurable: true
      })
    }
  }
}
