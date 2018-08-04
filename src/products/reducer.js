import { List, Record } from 'immutable';
import { productActions } from './actions';


export const ProductsState = new Record({
  filter: '',
  search: '',
  sort: new Record({orderBy: 'name', orderDir: 'desc'}),
  loading: true,
  list: new List()
});

export function productsReducer(state = new ProductsState(), {payload, type}) {
  switch (type) {
    case productActions.LOAD_PRODUCTS:
      return state.set('list', payload).set('loading', false);

    case productActions.FILTER_PRODUCTS:
      return state.set('filter', payload.filterValue || '');

    case productActions.SEARCH_PRODUCTS:
      return state.set('search', payload.searchValue || '');

    case productActions.SORT_PRODUCTS:
      return state.set('sort', payload);

    default:
      return state;
  }
}
