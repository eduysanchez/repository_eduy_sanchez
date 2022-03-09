import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/cinema-listings';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[] = [];
  public swiper: Swiper | undefined;

  constructor() { }
  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      loop: true,
    });    
  }

  ngOnInit(): void {}

  onClickSlidePrev(){
    this.swiper?.slidePrev();
  }

  onClickSlideNext(){
    this.swiper?.slideNext();
  }

}
