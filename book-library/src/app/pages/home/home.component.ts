import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  books: Book[] = new Array<Book>();
  defaultCover = 'https://via.placeholder.com/150'; // Path to a default book cover
  isLoading = true;
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((response: any) => {
      // Map the works array to the Book model
      this.books = response.works.map((book: any) => ({
        key: book.key,
        title: book.title,
        cover_id: book.cover_id,
        authors: book.authors,
        first_publish_year: book.first_publish_year
      }));
      this.isLoading = false;
    });
  }
  // get authors as a string
  getAuthorNames(authors: { name: string }[]): string {
    return authors.map(author => author.name).join(', ');
  }
}
