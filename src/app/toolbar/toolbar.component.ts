import { Component, OnInit } from '@angular/core';
import {ModuleService} from '../shared/module.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: [ModuleService]
})
export class ToolbarComponent implements OnInit {

  modules: any = [];
  selectedModule: string;
  
  constructor(private service: ModuleService) { }

  ngOnInit() {
    this.service.getModules()
    .subscribe(modules => this.modules = modules, console.error, null);  
  }
  
  initNewModule(){
    this.service.initNewModule()
    .subscribe(console.log,console.error,null);
  }
  
  onSelectModule(module: any){
    this.selectedModule = module.uuid;
  }
  
  addModule(){
    this.service.insertModule(this.selectedModule)
    .subscribe(console.log,console.error, null);
  }
  

}
