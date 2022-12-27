import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'YNcFPKdO1seIRCPw3D62n3G40ugSrs96';
  private _history: string[] = [];
  // Must change any to correct type
  public results: any[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {}

  searchGifs(query: string) {
    query = query.trim().toLowerCase();

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
    }

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=YNcFPKdO1seIRCPw3D62n3G40ugSrs96&q=dragon ball z')
    // .then( response => {
    //   response.json().then(data => console.log(data))
    // })
    this.http
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=YNcFPKdO1seIRCPw3D62n3G40ugSrs96&q=${query}&limit=10`
      )
      .subscribe((response: any) => {
        console.log(response);
        this.results = response.data;
      });
  }
}
