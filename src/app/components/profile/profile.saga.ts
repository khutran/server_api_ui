import * as _ from 'lodash';
import detail from './detail/detail.saga';
import { fork } from 'redux-saga/effects';

export default _.map([...detail], item => fork(item));
