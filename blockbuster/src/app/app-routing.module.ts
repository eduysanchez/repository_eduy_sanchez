import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieRentComponent } from './pages/movie-rent/movie-rent.component';
import { MovieComponent } from './pages/movie/movie.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  { path: 'movie-rent', component: MovieRentComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'search/:text', component: SearchComponent },
  { path: '**', redirectTo: '/movie-rent' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
