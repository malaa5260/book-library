import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,MatInputModule,MatButtonModule,MatProgressSpinnerModule,MatSelectModule,RouterModule ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm: string = '';
  searchKey: string = 'title'; // Default search key
  books: any[] = new Array<any>();
  defaultCover = 'https://fakeimg.pl/150x150?text=Cover + Image'; // Path to a default book cover
  isLoading = false;
  constructor(private bookService: BookService) {}

  onSearch(): void {
    if (this.searchTerm.trim().length < 3) { // Only search if there are at least 3 characters
      this.clearSearch();
      return;
    }
    this.isLoading = true;
    const queryParam = this.searchKey === 'title' ? 'title' : this.searchKey === 'author' ? 'author_name' : 'subject';

    this.bookService.searchBooks(this.searchTerm, queryParam).subscribe(
      (response: any) => {
        this.books = response.docs.slice(0, 9).map((book:any) => ({
          key: book.key,
          title: book.title,
          cover_id: book.cover_i,
          authors: book.author_name,
          first_publish_year: book.first_publish_year,
        }));
        this.isLoading = false;
      }
    );
  }
  // onSearch(): void {
  //   if (this.searchTerm.length > 2) { // Only search when there are more than 2 characters
  //     this.isLoading = true;
  //     this.bookService.searchBooks(this.searchTerm).subscribe((response: any) => {
  //       this.books = response.docs.slice(0, 9).map((book: any) => ({
  //         title: book.title,
  //         cover_id: book.cover_i,
  //       }));
  //       this.isLoading = false;
  //     });
  //   }
  // }
  clearSearch(): void {
    this.searchTerm = '';
    this.books = new Array<Book>();
  }
}
