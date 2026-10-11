export interface AcaiReturn<T> {
  promise: Promise<T>;
}

export const returnWrapper: {
  (): AcaiReturn<void>;
  <T>(awaitable: Promise<T>): AcaiReturn<T>;
} = <T>(awaitable?: Promise<T>) => ({
  promise: awaitable || Promise.resolve(),
});
