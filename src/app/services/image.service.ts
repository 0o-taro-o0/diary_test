import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Image} from "../image";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  api_url: string;

  constructor(private httpClient: HttpClient) {
    this.api_url = 'http://localhost:8000/api/';
  }
  list(date: string){
    return this.httpClient.get<Image[]>(`${this.api_url}image/diary/${date}/`)
  }
}
