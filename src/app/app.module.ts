import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VotoComponent } from './voto/voto.component';
import { CandidatoComponent } from './candidato/candidato.component';

@NgModule({
  declarations: [
    AppComponent,
    VotoComponent,
    CandidatoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
