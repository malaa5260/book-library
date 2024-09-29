import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://openlibrary.org/subjects/finance.json?limit=9'; // OpenLibrary API

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
