import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestOptionsArgs, RequestMethod, ResponseContentType } from '@angular/http';
import { AlertsService } from '@jaspero/ng2-alerts';

import 'rxjs/add/operator/toPromise';
import { AuthGuard } from '../guards/auth.guard';
import { environment } from '../../../environments/environment';
import { BlogData } from '../../components/blog/blog.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpHandler {

  response: any = [];
  constructor(private http: Http,
    private http1: HttpClient,
    private _alert: AlertsService,
    private authGuard: AuthGuard) {

  }

  private addAuthKeysToBody(iObj) {
    iObj['token_string'] = environment.api_token;
    iObj['token_type'] = environment.user_env;
    iObj['token_vendor_id'] = environment.vender_id;
    iObj['DevKey'] = environment.dev_key;
  }

  private getHeader() {
    // tslint:disable-next-line:prefer-const
    let header = {
      'Content-Type': 'application/json'
    };
    this.addAuthKeysToBody(header);

    return new Headers(header);
  }

  private getAuthHeader(reqTyp: any) {
    // tslint:disable-next-line:prefer-const
    let userData = this.authGuard.getUser();
    if (userData) {
      // tslint:disable-next-line:prefer-const
      let header = {
        'Authorization': 'Bearer ' + userData._token
      };

      this.addAuthKeysToBody(header);

      switch (reqTyp) {
        case 1:
          // header['Content-Type'] = '';
          break;
        case 0:
        default:
          header['Content-Type'] = 'application/json';
      }
      return new Headers(header);
    } else {
      this.checkAuthStatus(this, { status: 401 });
    }
  }

  getUrl() {
    return environment.apiUrl;
  }

  getAuthUrl() {
    return environment.apiUrl;
    // let userId = this.authGuard.getUserId();
    // if (userId) {
    //   return environment.apiUrl + '/merchants/' + userId;
    // }
    // else {
    //   this.authGuard.logout();
    // }
  }

  private request(url: string, options: RequestOptionsArgs) {
    // return Observable.create(observer => {
    //   this.http.options(url, options)
    //   .subscribe(data=>{
    //     observer.next(data['_body']['data']);
    //     observer.complete(data['_body']['data']);
    //     // observer.error(new Error('error message'));
    //   });
    // });
    return this.http.options(url, options)
      .toPromise()
      .then(data => {
        // tslint:disable-next-line:prefer-const
        let response = data.json();

        if (data.status === 200 && response) {
          return response;
        } else {
          return {
            message: 'Error'
          };
        }
      },
      error => {
        return this.checkAuthStatus(this, error);
      });
    // .catch(this.handleError);
  }

  private requestAdsFix(url: string, options: RequestOptionsArgs) {
    // tslint:disable-next-line:prefer-const
    let THIS = this;
    return this.http.get(url, options)
      .toPromise()
      .then(data => {
        // tslint:disable-next-line:prefer-const
        let response = data.json();
        if (data && data.status === 200 && response) {
          return response;
        } else {
          return {
            message: 'Error'
          };
        }
      }, error => {
        return this.checkAuthStatus(this, error);
      });
    // .catch(this.handleError);
  }

  private checkAuthStatus(THIS, dt) {
    if (dt.status === 401) {
      THIS._alert.create('error', 'Session is expired! Signin again to continue.');
      this.authGuard.logout();
      // return;
    }

    return Promise.reject({
      message: THIS.getErrorMsg(dt)
    });
  }

  getErrorMsg(error: any) {
    let errorMessage = '';
    switch (error.status) {
      case 400:
        errorMessage = 'Bad Request';
        break;
      case 401:
        errorMessage = 'Unauthorized';
        break;
      case 403:
        errorMessage = 'Forbidden';
        break;
      case 404:
        errorMessage = 'Not Found';
        break;
      case 405:
        errorMessage = 'Method Not Allowed';
        break;
      case 500:
        errorMessage = 'Internal Server Error';
        break;
      case -1:
        errorMessage = 'Gateway Timeout';
        break;
      case 0:
        errorMessage = 'Check your internet connection and try again';
        break;
      default:
        errorMessage = '';
        break;
    }
    return error.message || error.statusText || errorMessage;
    // return Promise.reject({
    //   message: error.message || error.statusText || errorMessage
    // });
  }

  private getRequest(url: string, headers: Headers, body: any) {
    // tslint:disable-next-line:prefer-const
    let options = {
      url: url,
      method: RequestMethod.Get,
      search: null,
      params: body,
      headers: headers,
      body: null,
      withCredentials: null,
      responseType: ResponseContentType.Json
    };

    return this.requestAdsFix(url, options);
  }

  private postRequest(url: string, headers: Headers, body: any, method: RequestMethod) {
    body['APIDetails'] = {};

    this.addAuthKeysToBody(body['APIDetails']);

    // tslint:disable-next-line:prefer-const
    let options = {
      url: url,
      method: method,
      search: null,
      params: null,
      headers: headers,
      body: body,
      withCredentials: null,
      responseType: ResponseContentType.Json
    };
    return this.request(url, options);
  }

  get(url: string, body: any) {
    return this.getRequest(url, this.getHeader(), body);
  }

  authGet(url: string, body: any) {
    return this.getRequest(url, this.getAuthHeader(0), body);
  }

  post(url: string, body: any) {
    return this.postRequest(url, this.getHeader(), body, RequestMethod.Post);
  }

  authPost(url: string, body: any) {
    return this.postRequest(url, this.getAuthHeader(0), body, RequestMethod.Post);
  }

  put(url: string, body: any) {
    return this.postRequest(url, this.getHeader(), body, RequestMethod.Put);
  }

  authPut(url: string, body: any) {
    return this.postRequest(url, this.getAuthHeader(0), body, RequestMethod.Put);
  }

  delete(url: string, body: any) {
    return this.postRequest(url, this.getHeader(), body, RequestMethod.Delete);
  }

  authDelete(url: string, body: any) {
    return this.postRequest(url, this.getAuthHeader(0), body, RequestMethod.Delete);
  }

  authFileUpload(url: string, formData: any) {
    return this.postRequest(url, this.getAuthHeader(1), formData, RequestMethod.Post);
  }

  getEntries(url: string): Promise<BlogData[]> {
    return this.http1.get(url)
      // tslint:disable-next-line:prefer-const
      .toPromise().then((data: Response) => {
        this.response = data;
        return this.response;
      });
    }
}
