import { ModuleComponent } from '../module/module.component';
import { Component, OnInit, Input, HostListener } from '@angular/core';
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
  
  @Input() moduleComponent: ModuleComponent;
  
  constructor(private service: ModuleService) { }

  ngOnInit() {
    this.service.getModules()
    .subscribe(modules => this.modules = modules, console.error, null);  
  }
  
  initNewModule(){
    this.service.initNewModule()
    .subscribe(m => this.moduleComponent.update(m),console.error,null);
  }
  
  onSelectModule(event){
    this.selectedModule = event.target.value;
  }
  
  addModule(){
    this.service.insertModule(this.selectedModule)
    .subscribe(console.log,console.error, null);
  }
  

}
