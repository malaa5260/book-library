import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-detail',
  standalone: true,
  imports: [],
  templateUrl: './author-detail.component.html',
  styleUrl: './author-detail.component.scss'
})
export class AuthorDetailComponent implements OnInit{
  authorDetails: any = null;
  defaultCover = 'https://fakeimg.pl/150x150?text=Cover + Image';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const authorKey = this.route.snapshot.paramMap.get('key'); 
    if (authorKey) {
      this.bookService.getAuthorDetails(authorKey).subscribe((data) => {
        this.authorDetails = data;
      });
    }
  }
}
