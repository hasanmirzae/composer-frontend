import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';
import { globals } from '../globals';

@Injectable()
export class ModuleService {

  constructor(private http: HttpClient) {}

  getData(uuid: string){
    return this.http.get(environment.server.address + '/modules/' + uuid);
  }
  
  initNewModule(){
    // TODO get object from form
    return this.http.post(environment.server.address + '/modules/new',{
      simpleName: "SampleModule",
      packageName: "org.example",
      groupId: "org.edu",
      artifactId: "sample-module",
      version: "SNAPSHOT-1.0.0",
      inputType: {id:"java.lang.String",simpleName: "String",packageName:"java.lang"},
      outputType: {id:"java.lang.String",simpleName: "String",packageName:"java.lang"}
    });
  }
  
  getModules(){
    return this.http.get(environment.server.address + '/modules/');
  }

  insertModule(uuid: string){
    // uuid of module to be inserted
    return this.http.put(environment.server.address + '/modules/add/'+uuid,{});
  }
  
  save(){
    return this.http.post(environment.server.address + '/modules/save', {});
  }
  
  addLink(from: string, to: string){
    return this.http.post(environment.server.address + '/modules/links', {source: from, target: to});
  }
  
  compose(){
    return this.http.post(environment.server.address + '/modules/compose', {});
  }
  
  setOutputNode(uuid: string){
    return this.http.post(environment.server.address + '/modules/output/'+uuid, {});
  }


  setEntryNode(uuid: string){
    return this.http.post(environment.server.address + '/modules/entry/'+uuid, {});
  }
}
