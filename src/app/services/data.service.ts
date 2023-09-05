import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../intefaces/post.interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    console.log('getting posts')
    return this.http.get<Post[]>(this.url);
  }
}
