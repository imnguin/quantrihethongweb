import { combineReducers } from 'redux'
import breadcrumbReducer from './BreadcrumbReducer'
import loaddingReducer from './LoaddingReducer'
import userReducer from './UserReducer'
export * from './BreadcrumbReducer'
export * from './LoaddingReducer'
export * from './UserReducer'

export const rootReducer = combineReducers({
  breadcrumb: breadcrumbReducer,
  loadding: loaddingReducer,
  user: userReducer
})