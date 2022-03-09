import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { SearchComponent } from './search/search.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { RatingModule } from 'ng-starrating';
import { FormsModule } from '@angular/forms';
import { MovieRentComponent } from './movie-rent/movie-rent.component';

@NgModule({
  declarations: [
    HomeComponent,
    MovieComponent,
    SearchComponent,
    MovieRentComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    RatingModule,
    FormsModule,
  ],
})
export class PagesModule {}
