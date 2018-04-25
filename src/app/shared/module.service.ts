import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';

@Injectable()
export class ModuleService {

  constructor(private http: HttpClient) {}

  getData(uuid: string){
    return this.http.get(environment.server.address + '/modules/' + uuid);
  }
  
  initNewModule(){
    return this.http.post(environment.server.address + '/modules/new',{});
  }
  
  getModules(){
    return this.http.get(environment.server.address + '/modules/');
  }

  insertModule(uuid: string){
    return this.http.put(environment.server.address + '/modules/'+uuid,{});
  }
}
