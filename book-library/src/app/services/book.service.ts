import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'https://openlibrary.org'; // OpenLibrary API
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/subjects/finance.json?limit=9');
  }
  searchBooks(query: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search.json?q=${query}`);
  }
  getBookDetails(key: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/books/${key}.json`);
  }

  getEditionDetails(key: string): Observable<any> {
    const url = `${this.baseUrl}${key}/editions.json`;
    return this.http.get(url);
  }
  getAuthorDetails(authorKey: string): Observable<any> {
    const url = `${this.baseUrl}${authorKey}.json`;
    return this.http.get(url);
  }


  private selectedBookSubject = new BehaviorSubject<Book | null>(this.loadBookFromLocalStorage());
  selectedBook$ = this.selectedBookSubject.asObservable();

  selectBook(book: Book) {
    this.selectedBookSubject.next(book);
    this.saveBookToLocalStorage(book);
  }

  loadBookFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
        const book = localStorage.getItem('selectedBook');
        return book ? JSON.parse(book) : null;
    }
    return null; 
}

  saveBookToLocalStorage(book: Book) {
    localStorage.setItem('selectedBook', JSON.stringify(book));
  }
}
