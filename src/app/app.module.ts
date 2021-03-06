import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ModuleComponent } from './module/module.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ModuleDetailsComponent } from './module-details/module-details.component';



@NgModule({
  declarations: [
    AppComponent,
    ModuleComponent,
    ToolbarComponent,
    ModuleDetailsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
