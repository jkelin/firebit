export interface Action<TType extends string, TPayload> {
  type: TType;
  payload: TPayload;
  create?: (payload: TPayload) => Action<TType, TPayload>;
}

export function makeAction<TPayload, TType extends string>(type: TType, samplePayload?: TPayload): Action<TType, TPayload> {
  return {
    type,
    create: (payload: TPayload) => ({ type, payload })
  } as any;
}
