import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,MatInputModule,MatButtonModule,MatProgressSpinnerModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm: string = '';
  books: Book[] = new Array<Book>();
  defaultCover = 'https://fakeimg.pl/150x150?text=Cover + Image'; // Path to a default book cover
  isLoading = false;
  constructor(private bookService: BookService) {}

  onSearch(): void {
    if (this.searchTerm.length > 2) { // Only search when there are more than 2 characters
      this.isLoading = true;
      this.bookService.searchBooks(this.searchTerm).subscribe((response: any) => {
        this.books = response.docs.map((book: any) => ({
          title: book.title,
          cover_id: book.cover_i,
        }));
        this.isLoading = false;
      });
    }
  }
  clearSearch(): void {
    this.searchTerm = '';
    this.books = new Array<Book>();
  }
}
