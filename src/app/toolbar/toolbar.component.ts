import { ModuleComponent } from '../module/module.component';
import { Component, OnInit, Input, HostListener  } from '@angular/core';
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
  linkFrom: any;
  linkTo: any;
  entryNode: any;
  outputNode: any;
  
  @Input() moduleComponent: ModuleComponent;
  
  constructor(private service: ModuleService) { }

  ngOnInit() {
    this.loadModules();
  }
  
  loadModules(){
    this.service.getModules()
    .subscribe(modules => {
      this.modules = modules || [];
      this.selectedModule = this.modules.length > 0 ? this.modules[0].uuid : null;
    }, console.error, null);  
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
    .subscribe(this.loadModules.bind(this), console.error, null);
  }
  
  
  addLink(){
    if (this.linkFrom && this.linkTo && (this.linkFrom.uuid === this.linkTo.uuid) && (this.linkFrom.index === this.linkTo.index)){
      console.log("Link to self not allowd!");
      return;
    } else if (this.linkFrom && this.linkTo){
     this.service.addLink(this.linkFrom, this.linkTo)
        .subscribe(() => this.moduleComponent.update({uuid: globals.activeModule}), console.error, null);
    }

  }
  
  compose(){
    this.service.compose()
      .subscribe(console.log, console.error,null);
  }
  
  setEntryNode(event){
    this.service.setEntryNode(this.entryNode)
      .subscribe(console.log, console.error,null);
  }

    setOutputNode(event){
    this.service.setOutputNode(this.outputNode)
      .subscribe(console.log, console.error,null);
  }

}
