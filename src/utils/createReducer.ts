import { Action } from 'redux'

type Handlers<State, Types extends string, Actions extends Action<Types>> = {
  readonly [Type in Types]: (
    state: State,
    action: Extract<Actions, Action<Type>>
  ) => State
}

/**
 * reducer包装函数 让reducer写法变得更易读
 * 泛型类型的3个类型参数：当前state初始值类型、当前store actionType、当前store antion方法类型
 */
export const createReducer = <
  State,
  Types extends string,
  Actions extends Action<Types>
>(
  initState: State,
  handlers: Handlers<State, Types, Actions>
) => (state = initState, action) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type as Types](state, action)
    : state
