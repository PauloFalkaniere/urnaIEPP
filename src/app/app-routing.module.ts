import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContagemComponent }  from './contagem/contagem.component';
import { VotoComponent } from './voto/voto.component';

const appRoutes: Routes = [
  {
    path: 'contagem',
    component: ContagemComponent,
  },
  {
    path: 'voto',
    component: [VotoComponent]
  },
  { path: '**', component: VotoComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
