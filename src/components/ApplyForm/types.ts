/** Kept out of actions.ts: a 'use server' module may only export async
 *  functions, so a plain object exported from there arrives undefined on the
 *  client. */
export interface ApplyState {
  status: 'idle' | 'success' | 'error'
  message: string
  fieldErrors: Record<string, string>
}

export const initialApplyState: ApplyState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
}
