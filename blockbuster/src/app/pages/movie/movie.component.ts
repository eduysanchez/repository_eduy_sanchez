import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { MovieDetails } from '../../interfaces/movie-details';
import { StarRatingComponent } from 'ng-starrating';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/movie-credits';
import { combineLatest } from 'rxjs';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  id_movie = 0;

  public movies: MovieDetails[] = [];
  public actores: Cast[] = [];
  public directing: Cast[] = [];

  btn_save: boolean = true;
  btn_remove: boolean = false;
  btn_cancel: boolean = false;
  btn_update: boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private moviesServices: MoviesService,
    private location: Location,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.id_movie = this.activateRoute.snapshot.params.id || '';

    combineLatest([

      this.moviesServices.getMovieDetails(this.id_movie),
      this.moviesServices.getMovieCredits(this.id_movie)

    ]).subscribe( ([movie, cast]) => {

      if (!movie) {
        this.location.back();
        return;
      }

      this.movies = [];
      this.movies.push(movie);
      this.actores = cast.filter( cast => cast.known_for_department == "Acting" && cast.profile_path !== null);
      this.directing = cast.filter( cast => cast.known_for_department == "Directing" && cast.profile_path !== null);
      
    })

    var movie_local = localStorage.getItem(this.id_movie.toString());
    if (movie_local) {
      this.btn_save = false;
      this.btn_remove = true;
      this.btn_update = true;
    }
  }

  prevPage(){
    this.location.back();
  }

  saveMovie(movie: NgForm){
    if (movie.invalid) {
      Object.values(movie.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }

    Swal.fire({
      title: 'Você quer salvar o filme?',
      showCancelButton: true,
      confirmButtonText: `Salvar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Filme salvo!', '', 'success')

        let movieJson = '{"id":'+ movie.value.id_movie +',"fornecedor":"'+ movie.value.fornecedor +'","idioma":"'+ movie.value.idioma +'","tipo_movie":"'+ movie.value.tipo_movie +'","tipo_produto":"'+ movie.value.tipo_produto +'","valor_aluguer":"'+ movie.value.valor_aluguer +'","data_cadastro":"'+ Date.now() +'"}';
    
        localStorage.setItem("movie_" + movie.value.id_movie, movieJson);

        this.router.navigate(['/movie-rent']);
      }
    })
  }

  onClickUpdate(){
    this.btn_save = true;
    this.btn_cancel = true;
    this.btn_update = false;
  }

  onClickCancel(){
    this.btn_save = false;
    this.btn_cancel = false;
    this.btn_update = true;
  }

  onClickRemove(){

    Swal.fire({
      title: 'Você quer excluir o filme?',
      showCancelButton: true,
      confirmButtonText: `Excluir`,
    }).then((result) => {
      if (result.isConfirmed) {

        localStorage.removeItem(this.id_movie.toString());
        Swal.fire('Filme excluido!', '', 'success')
        this.router.navigate(['/movie-rent']);
      }
    })
    
  }

}
