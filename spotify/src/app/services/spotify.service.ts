import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private baseUrl: string = environment.baseUrl;
  private access_token: string = '';
  private token_type: string = '';

  constructor(private http: HttpClient) {}

  getTokenSpotify() {
    const url = `${this.baseUrl}/1de877e4c9f440c1a699c7058ec546b5/972505a16972432687497fbb189c3657`;

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.token_type = resp.token_type;
        this.access_token = resp.access_token;

        return resp.access_token;
      })
    );
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization: `${this.token_type} ${this.access_token}`,
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(
      map((data: any) => data['albums'].items)
    );
  }

  getArtists(find: string) {
    return this.getQuery(`search?q=${find}&type=artist&limit=10`).pipe(
      map((data: any) => data['artists'].items)
    );
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
    //  .pipe( map( data => data['artists'].items))
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data: any) => data['tracks'])
    );
  }
}
