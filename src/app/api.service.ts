import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

public getData(randomNum: number){
    return this.http.get<any>('/' + randomNum + '/info.0.json')
  }  
}
