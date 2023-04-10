import {atom} from "recoil";
import {initialTestState} from "../utils/quiz";

//testList
const testListAtom = atom({
  key: 'testList',
  default: [initialTestState],
});

//testItem
const testStateAtom = atom({
  key: 'testState',
  default: initialTestState,
});

//testItem
const myAnswerAtom = atom({
  key: 'myAnswerAtom',
  default: [],
});

export{testListAtom, testStateAtom, myAnswerAtom}

