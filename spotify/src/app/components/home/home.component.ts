import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  newMusic: any[] = [];
  loading: boolean;
  errorApi: boolean;
  messageError: string;

  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.errorApi = false;
    this.spotify.getTokenSpotify().subscribe((resp) => {
      if (resp) {
        this.spotify.getNewReleases().subscribe(
          (data: any) => {
            this.newMusic = data;
            this.loading = false;
          },
          (error) => {
            this.loading = false;
            this.errorApi = true;
            this.messageError = error.error.error.message;
          }
        );
      }
    });
  }

  ngOnInit(): void {}
}
