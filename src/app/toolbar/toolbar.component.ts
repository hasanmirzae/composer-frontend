import { ModuleComponent } from '../module/module.component';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import {ModuleService} from '../shared/module.service';
import { globals } from '../globals';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: [ModuleService]
})
export class ToolbarComponent implements OnInit {

  modules: any = [];
  selectedModule: string;
  linkFrom: string;
  linkTo: string;
  
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
    .subscribe(() => this.moduleComponent.update({uuid: globals.activeModule}), console.error, null);
  }
  
  save(){
    this.service.save()
    .subscribe(console.log,console.error,null);
  }
  
  onSelectFrom(event){
    this.linkFrom = event.target.value;
    console.log(this.linkFrom);
  }
  
  onSelectTo(event){
    this.linkTo = event.target.value;
    console.log(this.linkTo);
  }
  
  addLink(){
      console.log('before addLink() called')
    if (this.linkFrom && this.linkTo && (this.linkFrom !== this.linkTo)){
      console.log('addLink() called')
      this.service.addLink(this.linkFrom, this.linkTo)
        .subscribe(() => this.moduleComponent.update({uuid: globals.activeModule}),console.error, null);
    }
  }
  

}
