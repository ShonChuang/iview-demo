import { catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export default {
  callLoginAPI(account, password) {
    const body = JSON.stringify({ AccountId: account, Password: password });
    return ajax
      .post('/api/login', body, { 'Content-Type': 'application/json' })
      .pipe(catchError((error) => {
        console.log('error: ', error);
      }));
  }
};
