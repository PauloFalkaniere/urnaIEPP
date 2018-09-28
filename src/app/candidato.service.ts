import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Candidato } from './candidato';
import { CANDIDATOS } from './data_candidatos';
import { VotoService } from './voto.service';
import { Voto } from './voto';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private nextId: number;
  private votos: Voto[];

  constructor(private votoService: VotoService) {
  }

  getCandidatos(): Candidato[]{
  	return CANDIDATOS;
  }

  getCandidato(num): Candidato{
    return CANDIDATOS.filter((candidato)=> candidato.id == num)[0];
  }

  addVoto(candidato): boolean{
    // define o voto a ser feito
    return this.votoService.addVoto(candidato);
  }
}
