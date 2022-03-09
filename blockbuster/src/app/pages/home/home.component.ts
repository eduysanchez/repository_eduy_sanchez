import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/cinema-listings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlide: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const top = (document.documentElement.scrollTop || document.body.scrollTop) + 2000;
    const height = (document.documentElement.scrollHeight || document.body.scrollHeight);
    
    if (top > height) {

      if (this.moviesServices.loading) {
        return;
      }

      this.moviesServices.getNowPlaying()
      .subscribe(movies => {
        this.movies.push(...movies);
      })
    }
    
  }

  constructor(private moviesServices: MoviesService) { }

  ngOnInit(): void {
    this.moviesServices.getNowPlaying()
    .subscribe(movies => {
      this.movies = movies;
      this.moviesSlide = movies;
    })
  }

  ngOnDestroy(){
    this.moviesServices.resetNowPlaying();
  }

}
