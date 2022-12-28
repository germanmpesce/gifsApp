import { Injectable} from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private urlService: string = 'https://api.giphy.com/v1/gifs'
  private apiKey: string = 'YNcFPKdO1seIRCPw3D62n3G40ugSrs96';
  private _history: string[] = [];
  // Must change any to correct type
  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    // Option1
    //this._history = localStorage.getItem('history');
    // if ( localStorage.getItem('history')) {
    //   this._history = JSON.parse (localStorage.getItem('history')!);
    // }

    // Option1
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    
    //Save results when you refresh the page
    //this.results = JSON.parse(localStorage.getItem('results')!) || [];

  }

  searchGifs(query: string) {
    query = query.trim().toLowerCase();

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }
    
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=YNcFPKdO1seIRCPw3D62n3G40ugSrs96&q=dragon ball z')
    // .then( response => {
    //   response.json().then(data => console.log(data))
    // })

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);


    this.http
      .get<SearchGifsResponse>(
        `${this.urlService}/search`, {params: params}
      )
      .subscribe((response: SearchGifsResponse) => {
        this.results = response.data;

        //Save results in localStorage
        //localStorage.setItem('results', JSON.stringify(this.results));

      });
  }
}
