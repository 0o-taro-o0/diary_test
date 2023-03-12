import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Diary} from "../diary";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  api_url: string;


  constructor(private httpClient: HttpClient) {
    this.api_url = 'http://localhost:8000/api/';
  }

  get(date: string) {
    return this.httpClient.get<Diary>(`${this.api_url}diary/${date}/`);
  }

  post(diary: Diary){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    return this.httpClient.post(`${this.api_url}diary/`, diary, httpOptions)
  }

  put(diary: Diary) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.httpClient.put(`${this.api_url}diary/${diary.date}/`, diary, httpOptions)
  }

  delete(date: string) {

  }

  list({range = '', year=0, month=0, day=0} = {}) {
    let param: string = '?'
    if (range != ''){param+=`range=${range}&`}
    if (year !=0){param+=`year=${year}&`}
    if (month!=0){param+=`month=${month}&`}
    if (day!=0){param+=`day=${day}&`}
    if (param == '?') {param = ''}
    else {param = param.slice(0, -1)}
    return this.httpClient.get<Diary[]>(this.api_url + 'diaries/' + param);
  }

  list_of() {

  }

}
