import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CinemaListings, Movie } from '../interfaces/cinema-listings';
import { MovieDetails } from '../interfaces/movie-details';
import { MovieCredits } from '../interfaces/movie-credits';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl = "https://api.themoviedb.org/3";
  private nowPlayingPage = 1;
  public loading = false;
  
  get params(){
    return {
      api_key: '2f879bd232d270a8e04813529f92a004',
      language: 'pt-BR',
      page: this.nowPlayingPage
    }
  }

  constructor(private http: HttpClient) { }

  resetNowPlaying(){
    this.nowPlayingPage = 1;
  }

  getNowPlaying():Observable<Movie[]>{

    if (this.loading) {
      return of([]);
    }

    this.loading = true;
    return this.http.get<CinemaListings>(`${ this.baseUrl }/movie/now_playing`, {
      params: this.params
    }).pipe(
      map( resp => resp.results.filter( movie => movie.poster_path !== null)),
      tap( () => {
        this.nowPlayingPage += 1;
        this.loading = false;
      })
    );
  }

  searchMovies(text: string):Observable<Movie[]>{

    const params = {...this.params, page: '1', query: text}

    if (this.loading) {
      return of([]);
    }

    this.loading = true;
    return this.http.get<CinemaListings>(`${ this.baseUrl }/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results.filter( movie => movie.poster_path !== null)),
      tap( () => {
        this.nowPlayingPage += 1;
        this.loading = false;
      })
    );
  }

  getMovieDetails(id: number){
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    )
  }

  getMovieCredits(id: number){
    return this.http.get<MovieCredits>(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map(resp => resp.cast),
      catchError( err => of([]))
    )
  }
}
