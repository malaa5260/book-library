import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SearchComponent } from './pages/search/search.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { AuthorDetailComponent } from './pages/author-detail/author-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'book/:key', component: BookDetailsComponent },
    { path: 'author/:key', component: AuthorDetailComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
