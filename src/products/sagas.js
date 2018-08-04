import { call, fork, put, take } from 'redux-saga/effects';
import { productActions } from './actions';
import { fetchProducts } from '../api';

function* watchLoadProducts() {
  while (true) {
    yield take(productActions.LOAD_PRODUCTS);
    const products = yield call(fetchProducts);
    yield put({
      type: productActions.LOAD_PRODUCTS,
      payload: products.data.data
    });
  } 
}

function* watchFilterChange() {
  while (true) {
    let { payload } = yield take(productActions.FILTER_PRODUCTS);
    yield put({
      type: productActions.FILTER_PRODUCTS,
      payload
    });
  }
}

function* watchSearchChange() {
  while (true) {
    let { payload } = yield take(productActions.SEARCH_PRODUCTS);
    yield put({
      type: productActions.SEARCH_PRODUCTS,
      payload
    });
  }
}

function* watchSortChange() {
  while (true) {
    let { payload } = yield take(productActions.SORT_PRODUCTS);
    yield put({
      type: productActions.SORT_PRODUCTS,
      payload
    });
  }
}

export const productSagas = [
  fork(watchLoadProducts),
  fork(watchFilterChange),
  fork(watchSearchChange),
  fork(watchSortChange),
];