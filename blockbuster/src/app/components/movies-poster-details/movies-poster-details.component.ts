import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MovieDetails } from '../../interfaces/movie-details';
import { StarRatingComponent } from 'ng-starrating';
import { MovieInfo } from '../../interfaces/movie-info';
import { Movie } from '../../interfaces/cinema-listings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-poster-details',
  templateUrl: './movies-poster-details.component.html',
  styleUrls: ['./movies-poster-details.component.css']
})
export class MoviesPosterDetailsComponent implements OnInit, AfterViewInit {

  @Input() movies: MovieDetails[] = [];

  infoMovie: MovieInfo[] = [];

  constructor(private router: Router) { }
  
  ngAfterViewInit(): void {
    var i, x: number;

    for (i = 0; i < localStorage.length; i++) {
      x = Number(localStorage.key(i));

      const infoMovie = localStorage.getItem(x.toString());

      if (infoMovie) {
        const obj = JSON.parse(infoMovie);
        this.infoMovie.push(obj);
      }
    }
  }

  ngOnInit(): void { }

  info(id: number){
    this.router.navigate(['/movie', id]);
  }

}
