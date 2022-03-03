export interface IRequest {
    url: string
    options?: {}
    httpOptions?: {}
    authenticate?: boolean
    id?: Number;
    isUpdate?: boolean;
    urlLivre?: boolean;
    isNotLoad?: boolean
}