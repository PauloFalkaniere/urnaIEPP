import { Component, OnInit } from '@angular/core';
import { Voto } from '../voto';
import {CandidatoService} from '../candidato.service'
import { Candidato } from '../candidato';

// const fs = require('fs');

@Component({
  selector: 'app-voto',
  templateUrl: './voto.component.html',
  styleUrls: ['./voto.component.css']
})
export class VotoComponent implements OnInit {

  constructor(private candidatoService: CandidatoService) { }

  ngOnInit() {
    this.candidatos = this.getCandidatos();
  }

  candidatos: Candidato[];

  getCandidatos(): Candidato[] {
    return this.candidatoService.getCandidatos();
  }

  getCandidato(id): Candidato{
    return this.candidatoService.getCandidato(id);
  }
  //caso nenhum dos candidatos seja escolhido
  VOTO_NULO: Candidato = {
    id: null,
    name: "VOTO NULO",
    total: null,
    vice:'',
    img_candidato: '',
    img_vice: '',
    partido: 'NULO',
    partido_sigla: 'NULO'
  }


  numero = "";
  voto_a = {
    primeiro_num: '',
    segundo_num: '',
  }

  // candidato a ser escolhido
  candidato: Candidato = {
  	id: null,
  	name: "",
  	total: null,
    vice:'',
    img_candidato: '',
    img_vice: '',
    partido: '',
    partido_sigla: '',
  }

  click(num): any{
    if(this.voto_a.primeiro_num == ''){
      this.voto_a.primeiro_num = num;

    } else if(this.voto_a.segundo_num == ''){
      this.voto_a.segundo_num = num;
    }

    if(this.voto_a.primeiro_num != "" && this.voto_a.segundo_num != ""){
      // define o id do candidato selecionado na Urna
      this.numero = this.voto_a.primeiro_num.concat(this.voto_a.segundo_num);

      // procura e retorna o candidato.
      this.candidato = this.getCandidato(this.numero);

      if(this.candidato == undefined){
       this.candidato =  this.VOTO_NULO;
      }
    }
  }

  corrige(): void{
    this.voto_a.primeiro_num = '';
    this.voto_a.segundo_num = '';
    this.candidato = {
      id: null,
      name: "",
      total: null,
      vice:'',
      img_candidato: '',
      img_vice: '',
      partido: '',
      partido_sigla: '',
    }
  }

  confirma(): void{
    if (this.candidato.name == "") {
      alert('Favor inserir o número do candidato e depois confirmar, ou apertar a tecla "Branco"');
    }
    this.votar();
  }

  branco(): void{
    this.candidato = {
      id: null,
      name: "BRANCO",
      total: null,
      vice:'',
      img_candidato: '',
      img_vice: '',
      partido: '',
      partido_sigla: '',
    }
    this.voto_a.primeiro_num = '';
    this.voto_a.segundo_num = '';
    this.votar();
  }

  votar(): void{
    this.candidatoService.addVoto(this.candidato);
  }

}
