import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {
  bookDetails: Book | null = null;
  defaultCover = 'https://fakeimg.pl/150x150?text=Cover + Image';


  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.selectedBook$.subscribe(book => {
      this.bookDetails = book; 
    });
  }
  // get authors as a string
  getAuthorNames(authors: { name: string }[]): string {
    return authors.map(author => author.name).join(', ');
  }
}
