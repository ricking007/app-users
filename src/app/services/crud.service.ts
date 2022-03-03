import { Injectable } from '@angular/core';
import { Messages } from '../enums/messages.enum';
import { IRequest } from '../interface/request.interface';
import { IResponse } from '../interface/response.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private httpService: HttpService,
  ) {
  }

  public async get(request: IRequest): Promise<IResponse> {

    return new Promise((resolve, reject) => {
      const response = this.httpService.get(request);
      const response$ = response.subscribe(
        result => {
          try {
            resolve(result);
          } catch (e) {
            reject(e);
          }
          response$.unsubscribe();
        },
        e => {
          reject(e);
          response$.unsubscribe();
        },
      );
    });
  }
}
