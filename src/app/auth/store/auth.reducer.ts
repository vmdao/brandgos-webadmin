import { AuthActions, AuthActionTypes } from './auth.actions';
import { User } from './../models/user';
import { createFeatureSelector } from '@ngrx/store';

export interface State {
  user: User | null;
  errorMessage: string | null;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
}

export const initialState: State = {
  user: {},
  errorMessage: null,
  isAuthenticating: false,
  isAuthenticated: false
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        isAuthenticating: true,
        errorMessage: null,
        isAuthenticated: false
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        isAuthenticated: true,
        isAuthenticating: false,
        user: {
          accessToken: action.payload.accessToken,
          username: action.payload.username
        }
      };

    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.error,
        isAuthenticating: false
      };

    default:
      return state;
  }
}

export const selectAuthState = createFeatureSelector<State>('auth');
