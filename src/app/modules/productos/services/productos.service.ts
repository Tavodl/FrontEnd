import { Injectable } from '@angular/core';


import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  HttpClient: HttpClient;

  constructor() { }


  ObtenerInfo(){
    // let url = 'localhost:3200/product/getProduct/'
    // return this.HttpClient.get(url).subscribe(
    //   resp =>()
    // );
  }



}
