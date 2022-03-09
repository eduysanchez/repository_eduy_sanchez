import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/cinema-listings';
import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-poster-grid',
  templateUrl: './movies-poster-grid.component.html',
  styleUrls: ['./movies-poster-grid.component.css']
})
export class MoviesPosterGridComponent implements OnInit {

  @Input() movies: Movie[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  detailsMovie(movie: Movie){
    this.router.navigate(['/movie', movie.id]);
  }

}
