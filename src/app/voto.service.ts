import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Voto } from './voto';
import { Candidato } from './candidato';
@Injectable({
  providedIn: 'root'
})
export class VotoService {
  private votos: Voto[];
  private nextId: number;

  constructor() {
    this.votos = this.getVotos();
    if(this.votos.length == 0){
      this.nextId = 1
    } else{
      let maxId = this.votos[this.votos.length -1].id;
      this.nextId = maxId++;

    }
  }

  getVotos(): Voto[]{
    let localStorageItem = localStorage.getItem('votos');
    return localStorageItem == null ? [] : JSON.parse(localStorageItem).votos;
  }

  addVoto(candidato: Candidato): boolean{
    let voto = new Voto(this.nextId++, candidato.id);
    this.votos.push(voto);
    try {
      this.setLocalStorageVotos(this.votos);
      return true;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }

  private setLocalStorageVotos(votos): void{
    localStorage.setItem('votos', JSON.stringify({ votos: votos}));
  }
}
