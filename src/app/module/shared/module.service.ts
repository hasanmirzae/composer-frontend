import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';

@Injectable()
export class ModuleService {

  constructor(private http: HttpClient) {}

  getData(uuid: string){
    return this.http.get(environment.server.address + '/module/' + uuid);
  }

}
