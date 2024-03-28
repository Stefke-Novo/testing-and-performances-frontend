import { Observable } from "rxjs";

export default interface IRequestService<T>{
    get(path:string):Observable<T>;
    post(path:string,value:object):Observable<T>;
    put(path:string,value:object):Observable<T>;
}