import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatProgressSpinnerModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  books: Book[] = new Array<Book>();
  defaultCover = 'https://fakeimg.pl/150x150?text=Cover + Image'; // Path to a default book cover
  isLoading = true;
  constructor(private bookService: BookService, private router: Router,) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((response: any) => {
      // Map the works array to the Book model
      this.books = response.works.map((book: any) => ({
        key: book.key,
        title: book.title,
        cover_id: book.cover_id,
        authors: book.authors,
        first_publish_year: book.first_publish_year,
        edition_count: book.edition_count
      }));
      this.isLoading = false;
    });
  }


  viewDetails(book: any) {
    this.bookService.selectBook(book); 
    this.router.navigate(['/book', book.key]); 
  }
}
