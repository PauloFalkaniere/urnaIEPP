import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Voto } from './voto';
import { Candidato } from './candidato';
import { CandidatoService } from './candidato.service';

@Injectable({
  providedIn: 'root'
})
export class VotoService {
  private votos: Voto[];
  private nextId: number;
  private candidato: Candidato;
  private candidatos: Candidato[];
  private votosNulos: number;

  constructor(private candidatoService: CandidatoService) {
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
  resetUrna(): void{
      return this.removeLocalStorageVotos();
  }
  getCandidato(id: number): Candidato{
    this.candidatos = this.candidatoService.getCandidatos();
    return this.candidatos.filter((candidato)=> candidato.id == id)[0];
  }
  contar(): void {
    try{
      this.candidatos = this.candidatoService.getCandidatos();
      this.candidatos.forEach(function(candidato){
        this.votos.forEach(function(voto){
          if(voto.candidato_id == candidato.id){
            candidato.total++
          }
        });
      },this);
      this.candidatoService.setCandidatos(this.candidatos);
    }
    catch(err){
      console.log(err);
    }
  }
  private setLocalStorageVotos(votos): void{
    localStorage.setItem('votos', JSON.stringify({ votos: votos}));
  }

  private removeLocalStorageVotos(): void{
    localStorage.removeItem('votos');
  }
}
