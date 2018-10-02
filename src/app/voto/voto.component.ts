import { Component, OnInit } from '@angular/core';
import { Voto } from '../voto';
import {CandidatoService} from '../candidato.service'
import { Candidato } from '../candidato';
import {Howl, Howler} from 'howler';
import { VotoService } from '../voto.service';


// const fs = require('fs');

@Component({
  selector: 'app-voto',
  templateUrl: './voto.component.html',
  styleUrls: ['./voto.component.css']
})
export class VotoComponent implements OnInit {
  private votorealidado: boolean;
  private somFinal: Howler;
  private urlSom: string;

  constructor(private candidatoService: CandidatoService, private votoService: VotoService) {
    this.urlSom = "../../assets/Sounds/somurna.mp3"
  }

  ngOnInit() {
    this.votorealidado = false;
    this.candidatos = this.getCandidatos();
    this.somFinal = new Howl({
      src: [this.urlSom]
    });
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
    id: 80,
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
      id: 80,
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
    let votoFinal = this.votoService.addVoto(this.candidato);
    if (votoFinal == true){
      this.votorealidado = true
      this.somFinal.play();
      setTimeout(function(){ location.reload(); }, 9000);
    } else {
      alert('error');
    }
  }

}
