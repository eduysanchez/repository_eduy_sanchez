import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artist: any = {};
  toTracks: any[] = [];
  loadingArtist: boolean;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.loadingArtist = true;
    this.router.params.subscribe(params => {
      this.getArtist(params['id']);
      this.getTopTracks(params['id']);
    })
   }

   getArtist(id: string){
    this.loadingArtist = true;
     this.spotify.getArtist(id)
     .subscribe(data => {
      this.artist = data;
      this.loadingArtist = false;
     })
   }

   getTopTracks(id: string){
     this.spotify.getTopTracks(id)
     .subscribe(topTracks => {
       this.toTracks = topTracks;
     })
   }

  ngOnInit(): void {
  }

}
