import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Diary} from "./diary";
import {Image} from "./image";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_url: string;

  constructor(private httpClient: HttpClient) {
    this.api_url = 'http://localhost:8000/api/';
  }
  getDiaries(){
    return this.httpClient.get<Diary[]>(this.api_url + 'diaries/');
  }
  getDiary(date: string){
    return this.httpClient.get<Diary>(`${this.api_url}diary/${date}/`);
  }
  getImages(date: string){
    return this.httpClient.get<Image[]>(`${this.api_url}diary/${date}/images/`);
  }
  getImage(id: number){
    return this.httpClient.get(`${this.api_url}image/diary/${id}/`)
  }
  getFirstImageURL(date: string){
    let images = this.httpClient.get<Image[]>(`${this.api_url}diary/${date}/images/`);
    images.subscribe({
      next(imgs:Image[]) {
        return `${imgs[0].id}`
      }
    })
  }
}
