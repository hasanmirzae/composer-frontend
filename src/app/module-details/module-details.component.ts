import { Component, OnInit, Input } from '@angular/core';
import { ModuleComponent } from '../module/module.component';
import {ModuleService} from '../shared/module.service';
import { globals } from '../globals';

@Component({
  selector: 'app-module-details',
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.css'],
  providers: [ModuleService]
})
export class ModuleDetailsComponent implements OnInit {

  model: any = {};
  constructor(private service: ModuleService){ 
  }

  simpleName: string = '';
  groupId: string = '';
  artifactId: string = '';
  version: string = '';
  
  ngOnInit() {
  }
  
  init(model: any){
    this.simpleName = model.simpleName;
    this.groupId = model.groupId;
    this.artifactId = model.artifactId;
    this.version = model.version;
  }

}
