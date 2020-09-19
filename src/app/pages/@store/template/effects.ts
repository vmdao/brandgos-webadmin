import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  concatMap,
  mergeMap,
} from 'rxjs/operators';
import { TemplateService } from './service';
import { TemplatesActions } from './actions';

import { Store } from '@ngrx/store';
import * as fromBussiness from '.';
const {
  getTemplates,
  getTemplatesFailure,
  getTemplatesSuccess,
  getTemplate,
  getTemplateFailure,
  getTemplateSuccess,
  createTemplate,
  createTemplateFailure,
  createTemplateSuccess,
  updateTemplate,
  updateTemplateFailure,
  updateTemplateSuccess,
  deleteTemplate,
  deleteTemplateFailure,
  deleteTemplateSuccess,
  getTemplateIcons,
  getTemplateIconsSuccess,
  getTemplateIconsFailure,
  getTemplateShapes,
  getTemplateShapesSuccess,
  getTemplateShapesFailure,
  getTemplateElements,
  getTemplateElementsSuccess,
  getTemplateElementsFailure,
  getTemplateIconsSearch,
  getTemplateIconsSearchSuccess,
  getTemplateIconsSearchFailure,
  render,
  renderSuccess,
  renderFailure,
} = TemplatesActions;

@Injectable()
export class TemplateEffects {
  constructor(
    private actions: Actions,
    private modelService: TemplateService,
    private store$: Store<fromBussiness.TemplateState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getTemplates),
      switchMap((pramas) => {
        return this.modelService.getAll(pramas.payload).pipe(
          map((payload) => getTemplatesSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getTemplatesFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getTemplate),
      switchMap((pramas) => {
        return this.modelService.get(pramas.payload).pipe(
          map((payload) => getTemplateSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getTemplateFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createTemplate),
      switchMap((pramas) => {
        return this.modelService.create(pramas.payload).pipe(
          map((payload) => createTemplateSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(createTemplateFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateTemplate),
      switchMap((pramas) => {
        return this.modelService.update(pramas.payload).pipe(
          map((payload) => updateTemplateSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(updateTemplateFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteTemplate),
      switchMap((pramas) => {
        return this.modelService.delete(pramas.payload).pipe(
          map((payload) => deleteTemplateSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(deleteTemplateFailure({ payload: err }));
          })
        );
      })
    )
  );

  changeSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteTemplateSuccess, updateTemplateSuccess, createTemplateSuccess),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store$.select(fromBussiness.getTemplatesParams))
        )
      ),
      map(([action, params]) => {
        const payload = { ...params };
        return getTemplates({ payload });
      })
    )
  );

  getListIcons$ = createEffect(() =>
    this.actions.pipe(
      ofType(getTemplateIcons),
      mergeMap((pramas) => {
        return this.modelService.getAll(pramas.payload).pipe(
          map((payload) => getTemplateIconsSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getTemplateIconsFailure());
          })
        );
      })
    )
  );

  getListShapes$ = createEffect(() =>
    this.actions.pipe(
      ofType(getTemplateShapes),
      switchMap((pramas) => {
        return this.modelService.getAll(pramas.payload).pipe(
          map((payload) => getTemplateShapesSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getTemplateShapesFailure());
          })
        );
      })
    )
  );

  getListElements$ = createEffect(() =>
    this.actions.pipe(
      ofType(getTemplateElements),
      switchMap((pramas) => {
        return this.modelService.getAll(pramas.payload).pipe(
          map((payload) => getTemplateElementsSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getTemplateElementsFailure());
          })
        );
      })
    )
  );

  getSearch$ = createEffect(() =>
    this.actions.pipe(
      ofType(getTemplateIconsSearch),
      switchMap((pramas) => {
        return this.modelService.search(pramas.payload).pipe(
          map((payload) => getTemplateIconsSearchSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getTemplateIconsSearchFailure());
          })
        );
      })
    )
  );

  render$ = createEffect(() =>
    this.actions.pipe(
      ofType(render),
      switchMap((params) => {
        return this.modelService.render(params.payload).pipe(
          map((payload) => {
            return renderSuccess({ payload });
          }),
          catchError((err) => {
            console.error(err);
            return of(renderFailure({ payload: err }));
          })
        );
      })
    )
  );
}
