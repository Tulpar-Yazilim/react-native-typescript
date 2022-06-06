import {takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../action-types';

export function* saga() {
  yield takeLatest(
    actionTypes.CHANGE_APP_LANGUAGE,
    function* changeAppLanguageSaga(data: any) {
      // const user_id = data.payload.id
      // const { response } = yield _getProfileInformation(user_id)
      // yield put(actions.setProfileInformation(response))
    },
  );

  // yield takeLatest(actionTypes.Register, function* registerSaga() {
  //   yield put(actions.requestUser())
  // })

  // yield takeLatest(actionTypes.UserRequested, function* userRequested() {
  //   const { data: user } = yield getUserByToken()
  //   yield put(actions.fulfillUser(user))
  // })
}
