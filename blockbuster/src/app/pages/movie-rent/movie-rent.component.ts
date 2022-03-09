import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieDetails } from '../../interfaces/movie-details';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-rent',
  templateUrl: './movie-rent.component.html',
  styleUrls: ['./movie-rent.component.css']
})
export class MovieRentComponent implements OnInit {

  public movies: MovieDetails[] = [];

  totalMovies = 0;

  constructor(
    private moviesServices: MoviesService,
    private location: Location
    ) { }

  ngOnInit(): void {

    this.movies = [];

    for (let i = 0; i < localStorage.length; i++) {
      const x = Number(localStorage.key(i));

      if (Number(x)) {
        this.moviesServices.getMovieDetails(x)
        .subscribe( movie => {
  
          if (!movie) {
            this.location.back();
            return;
          }
  
          this.movies.push(movie);
          this.totalMovies += 1;
  
        })
      }

    }
  }

}
