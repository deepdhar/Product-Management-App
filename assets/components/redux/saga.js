import {SIGN_UP, AUTHENTICATION_FAILED, SIGN_UP_SUCCESS} from './constants';
import { FIREBASE_AUTH } from '../../../src/Firebase/FirebaseConfig';

function* SagaData() {
    yield takeLatest(SIGN_UP, signUp);
}

function* signUp(action) {
    try {
        const auth = FIREBASE_AUTH;
        const result = yield call(
            [auth, auth.createUserWithEmailAndPassword],
            action.user.email,
            action.user.password,
        );

        yield put({type: SIGN_UP_SUCCESS, user: action.user});
    } catch (error) {
        const error_message = {code: error.code, message: error.message};

        yield put({type: AUTHENTICATION_FAILED, error: error_message});
    }
}

export default SagaData;
