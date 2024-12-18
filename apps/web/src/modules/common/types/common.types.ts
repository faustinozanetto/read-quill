export type ActionMap<M extends Record<string, unknown>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };

export type ReadActivty = Record<string, number>;
export interface ReadActivityEntry {
  level: number;
  date: string;
}

export const INTERVARL_TYPE = ['daily', 'weekly', 'monthly'] as const;
export type DataInterval = (typeof INTERVARL_TYPE)[number];
