import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Cast } from '../../interfaces/movie-credits';

@Component({
  selector: 'app-cast-slide',
  templateUrl: './cast-slide.component.html',
  styleUrls: ['./cast-slide.component.css']
})
export class CastSlideComponent implements OnInit, AfterViewInit {

  @Input() cast: Cast[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper', {
    slidesPerView: 5.3,
    freeMode: true,
    spaceBetween: 15
  });
  }

  ngOnInit(): void { }

}
