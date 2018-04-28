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

  @Input() moduleComponent: ModuleComponent;
  simpleName: string;
  
  constructor(private service: ModuleService) { 
  }

  ngOnInit() {
    this.simpleName = this.moduleComponent.model.simpleName;
  }

}
