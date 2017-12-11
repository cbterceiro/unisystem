import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges , OnInit} from '@angular/core';
import { HabilidadeService } from '../profile/habilidade/habilidade.service'
import { Habilidade } from '../profile/habilidade/habilidade.model'


@Component({
  selector: 'uns-habilidade-modal',
  templateUrl: 'habilidade-modal.component.html',
  styleUrls: ['habilidade-modal.component.css']
})

export class HabilidadeModalComponent implements OnChanges, OnInit {

  @Input() visible: boolean;
  @Input() habilidade: Habilidade;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  isLoadingRecomendacao : boolean;
  quemRecomendouList: any;
  defaultImageUrl: string = '/assets/img/default-user-icon.png';
  
  constructor(
    private habilidadeService: HabilidadeService
  ) { }
  
  ngOnInit(){
     this.isLoadingRecomendacao = true;
  }

 ngOnChanges(changes: SimpleChanges): void {
    if (this.habilidade && this.visible) {
    
      this.isLoadingRecomendacao = true;
      this.habilidadeService.getQuemRecomendou(this.habilidade)
        .subscribe(servidores =>  {
          this.isLoadingRecomendacao = false;
          if(servidores){
             this.quemRecomendouList = servidores;
          }
        });
    }
  }

  closeModal(): void {
    this.visible = false;
    this.habilidade = null;
    this.quemRecomendouList = null;
    this.visibleChange.emit(this.visible);
  }
}
