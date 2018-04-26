import { Injectable, Inject}    from '@angular/core';
import { HttpHandler } from '../common/services/http-handler';

@Injectable()
export class WowService {
  constructor(private _httpHandler:HttpHandler) { }

//   create(reqParam:any) {
//     return this.httpHandler.post(this.httpHandler.getUrl() + '/CSTicketinfo/', reqParam);
//   }

  // login(reqParam:any) {
  //   return this._httpHandler.post(this._httpHandler.getUrl() + '/CSTicketinfo/', reqParam);
  // }

  reset(reqParam:any) {
    return this._httpHandler.post(this._httpHandler.getUrl() + '/register/', reqParam);
  }

  registerUserStep1(reqParam:any) {
    return this._httpHandler.post(this._httpHandler.getUrl() + '/PreRegistration/', reqParam);
  }

  registerUserStep2(reqParam:any) {
    return this._httpHandler.post(this._httpHandler.getUrl() + '/ActivationLinkValidation/', reqParam);
  }

  registerUserStep3(reqParam:any) {
    return this._httpHandler.post(this._httpHandler.getUrl() + '/UserRegistration/', reqParam);
  }

  getBlog() {
    return this._httpHandler.getEntries(this._httpHandler.getUrl() + '/bloglist/');
  }
}
