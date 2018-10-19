
import { Observable } from 'rxjs';

const MockResult = { data: '', status: '', statusMsg: '' };
export default {
  callLoginAPI(account, password) {
    const body = JSON.stringify({ AccountId: account, Password: password });
    return Observable.create((observer) => {
      observer.next({ response: MockResult });
    });
    // .pipe(catchError((error) => {
    //   console.log('error: ', error);
    // }));
  }
};

