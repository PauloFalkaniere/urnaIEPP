import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Candidato } from './candidato';
import { CANDIDATOS } from './data_candidatos';
import { Voto } from './voto';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private nextId: number;
  private votos: Voto[];
  private candidatos: Candidato[];

  constructor() {
    this.setLocalStorageCandidatos(CANDIDATOS);
  }

  getCandidatos(): Candidato[]{
    let localStorageItem = localStorage.getItem('candidatos');
    return localStorageItem == null ? [] : JSON.parse(localStorageItem).candidatos;
  }

  getCandidato(num): Candidato{
    let localStorageItem = localStorage.getItem('candidatos');
    this.candidatos = localStorageItem == null ? [] : JSON.parse(localStorageItem).candidatos;
    return this.candidatos.filter((candidato)=> candidato.id == num)[0];
  }

  setCandidatos(candidatos): void{
    this.setLocalStorageCandidatos(candidatos);
  }


  private setLocalStorageCandidatos(candidatos): void{
    if(localStorage.getItem('candidatos') != null){
      localStorage.setItem('candidatos', JSON.stringify({ candidatos: candidatos}));
    }
  }
}
