
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';


export default {
  callLoginAPI(account, password) {
    const body = JSON.stringify({ AccountId: account, Password: password });
    return ajax
      .post('/api/login', body, { 'Content-Type': 'application/json' })
      .pipe(
        map((res) => {
          console.log('res: ', res);
          return res;
        }),
        catchError(error => console.log('error: ', error))
      );
  }
};
