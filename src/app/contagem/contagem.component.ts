import { Component, OnInit } from '@angular/core';
import { Voto }  from '../voto';
import { Candidato } from '../candidato';
import {CandidatoService } from '../candidato.service';
import { VotoService } from '../voto.service';
@Component({
  selector: 'app-contagem',
  templateUrl: './contagem.component.html',
  styleUrls: ['./contagem.component.css']
})
export class ContagemComponent implements OnInit {
  public candidatos: Candidato[];
  public votos: Voto[];

  constructor(private candidatoService: CandidatoService, private votoService: VotoService) { }

  ngOnInit() {
    this.contar();
    this.candidatos = this.getCandidatos();
    this.votos = this.getVotos();
  }

  getCandidatos(): Candidato[]{
    return this.candidatoService.getCandidatos();
  }
  getVotos(): Voto[]{
    return this.votoService.getVotos();
  }

  resetUrna(): void{
    this.votoService.resetUrna();
    return location.reload();
  }

  contar(): void{
    this.votoService.contar();
  }

}
