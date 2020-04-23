import { createSelector } from '@ngrx/store';
import * as fromBussiness from '../reducers';

export const getCarts = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.list
);

export const getCartProcessing = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.listProcessing
);
export const getAgencyCartProcessing = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.listAgencyProcessing
);
export const getAgencyOrders = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.agencyOrders
);
export const getAgencyOrder = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.agencyOrder
);

export const getCart = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.item
);

export const getPaymentItemDetail = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.paymentItemDetail
);
export const getPaymentItemDetailAffiliate = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.paymentItemDetailAffiliate
);

export const getCartsPagination = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.pagination
);

export const getCartsLoading = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.loading
);

export const getAgencyOrdersPagination = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.paginationOrders
);

export const getAgencyPayments = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.paymentsAgency
);
export const getAgencyPaymentsPagination = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.paginationAgencyPayments
);

export const getAffiliatePayments = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.paymentsAffiliate
);
export const getAffiliatePaymentsPagination = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.paginationAffiliatePayments
);

export const getAgencyOrdersNotPaid = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.ordersNotPaidAgency
);

export const getAffiliateOrdersNotPaid = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.carts.ordersNotPaidAffiliate
);
