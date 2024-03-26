import { Observable } from "rxjs";

export default interface IRequestService<T>{
    get(path:string):Observable<T>;
    post(path:string,value:T):Observable<T>;
}