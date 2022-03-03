import { HttpEvent, HttpEventType } from '@angular/common/http';
export interface IResponse {
    success?: boolean
    message?: string
    data?: any
    type?: HttpEvent<any>
}
