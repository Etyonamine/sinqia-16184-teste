import { ApiResult } from './../Interface/apiresult';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export class BaseService<T> {

  constructor(
              protected http: HttpClient,
              private API_URL: string) { }

  getData<ApiResult>(pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn:Array<string>,
    filterQuery: Array<string>): Observable<ApiResult> {


        var params = new HttpParams()
          .set("pageIndex", pageIndex.toString())
          .set("pageSize", pageSize.toString())
          .set("sortColumn", sortColumn)
          .set("sortOrder", sortOrder);

        if (filterQuery!= null) {
          var filterColumnString = this.montarParamHttpArrayToString(filterColumn);
          var filterQueryString =  this.montarParamHttpArrayToString(filterQuery);
          params = params
            .set("filterColumn", filterColumnString)
            .set("filterQuery", filterQueryString);
        }
    return this.http.get<ApiResult>(this.API_URL, {  params }).pipe(take(1));
  }

  list<T>(): Observable<T>{
    return this.http.get<T>(this.API_URL).pipe(take(1));
  }

  get<T>(codigo): Observable<T> {
    return this.http.get<T>(this.API_URL + "/" + codigo).pipe(take(1));
  }

  private create(record: T)
  {
    return this.http.post<T>(this.API_URL, record).pipe(take(1));
  }

  private update(record: T)
  {
    return this.http.put<T>(`${ this.API_URL + '/'+ record['codigo'] }`, record).pipe(take(1));
  }

  save(recurso: T){
    if(recurso['codigo']){
      return this.update(recurso);
    }
    else{
      return this.create(recurso);
    }
  }

  delete (codigo){
    return this.http.delete(`${ this.API_URL + '/' + codigo}`).pipe(take(1));
  }

  isDupe( item :T): Observable<boolean> {
    const headers = new HttpHeaders();
    headers.set("Content-Type", "application/json; charset=utf-8");

    var url = this.API_URL + '/IsDupe';
    return this.http.post<boolean>(url,item,{headers});
  }
  montarParamHttpArrayToString (array : Array<String>){
    var retorno : string;
    for (let i=0; i < array.length;i++){
      retorno = retorno + '|';    }
    return retorno;
  }

}
