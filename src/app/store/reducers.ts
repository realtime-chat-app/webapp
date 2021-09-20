import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from 'src/environments/environment';

export interface ApplicationState {
};

export const reducers: ActionReducerMap<ApplicationState> = {
};

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production ? [] : [];
