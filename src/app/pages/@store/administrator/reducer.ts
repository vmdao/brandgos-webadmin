import { AdministratorsActions, AdministratorActionsTypes } from './actions';
import { AdministratorModel } from './model';

export interface State {
  list: {
    data: Array<AdministratorModel>;
    loading: boolean;
    meta: {
      current_page: number;
      per_page: number;
      total: number;
    };
  };

  item: {
    data: AdministratorModel;
    loading: boolean;
  };
}

export const initialState: State = {
  list: {
    data: [],
    loading: false,
    meta: {
      current_page: 0,
      per_page: 0,
      total: 0
    }
  },
  item: {
    data: null,
    loading: false
  }
};

export function reducer(
  state = initialState,
  action: AdministratorsActions
): State {
  switch (action.type) {
    case AdministratorActionsTypes.GET_ADMINISTRATORS: {
      const list = { ...state.list, ...{ loading: true } };
      return {
        ...state,
        list
      };
    }
    case AdministratorActionsTypes.GET_ADMINISTRATORS_SUCCESS: {
      const list = { ...{ loading: false }, ...action.payload };

      return {
        ...state,
        list
      };
    }

    case AdministratorActionsTypes.GET_ADMINISTRATORS_FAILURE: {
      const list = { ...state.list, ...{ loading: false } };
      return {
        ...state,
        list
      };
    }
    case AdministratorActionsTypes.GET_ADMINISTRATOR: {
      const item = { ...state.item, ...{ loading: true } };
      return {
        ...state,
        item
      };
    }
    case AdministratorActionsTypes.GET_ADMINISTRATOR_SUCCESS: {
      const item = { ...{ loading: false }, ...action.payload };

      return {
        ...state,
        item
      };
    }
    case AdministratorActionsTypes.GET_ADMINISTRATOR_FAILURE: {
      const item = { ...state.item, ...{ loading: false } };
      return {
        ...state,
        item
      };
    }

    case AdministratorActionsTypes.INIT_ADMINISTRATOR: {
      return {
        ...state,
        ...{
          create: {
            loading: false,
            data: null,
            state: 'init'
          }
        }
      };
    }

    case AdministratorActionsTypes.CREATE_ADMINISTRATOR: {
      return {
        ...state,
        ...{
          create: {
            loading: true,
            data: action.payload,
            state: 'creating'
          }
        }
      };
    }
    case AdministratorActionsTypes.CREATE_ADMINISTRATOR_SUCCESS: {
      return {
        ...state,
        ...{ create: { loading: false, data: null, state: 'created' } }
      };
    }

    case AdministratorActionsTypes.CREATE_ADMINISTRATOR_FAILURE: {
      return {
        ...state,
        ...{ create: { loading: false, data: null, state: 'failed' } }
      };
    }

    default:
      return state;
  }
}
