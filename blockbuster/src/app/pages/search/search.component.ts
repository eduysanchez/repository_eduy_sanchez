import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/cinema-listings';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public movies: Movie[] = [];
  public titleMovie: string = "";

  constructor(private activateRoute: ActivatedRoute, private moviesServices: MoviesService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( params => {
      this.titleMovie = params.text;
      this.moviesServices.searchMovies(params.text)
      .subscribe( movies => {
        this.movies = movies;
      })
    })
  }

}
