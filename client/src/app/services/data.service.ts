import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfigUrl } from '../app.config'

@Injectable()
export class DataService {
  constructor(private http: Http) {
    console.log("data service connected...");
  }

  getDevices(){
    return this.http.get(ConfigUrl.concat(`devices`)).map(res => res.json());
  }
  getInterfaces(id){
    return this.http.get(ConfigUrl.concat(`interfaces?deviceId=${id}`)).map(res => res.json());
  }
  postInterfaces(value){
    var json = JSON.stringify(value);
    var params = json;
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(ConfigUrl.concat(`interfaces`),
      params,{
        headers: headers
      } )
      .map(res => res.json());
  }
}
