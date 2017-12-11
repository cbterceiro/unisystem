import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticatedUserService } from '../authentication';
import { Servidor, ServidorService, MessageService} from '../core';
import { HabilidadeService } from '../profile/habilidade/habilidade.service';
import { delay } from '../shared/functions';
import { ConfirmationService } from 'primeng/primeng';
@Component({
  providers: [HabilidadeService], 
  selector: 'uns-servidor-detalhe',
  templateUrl: 'servidor-detalhe.component.html',
  styleUrls: ['servidor-detalhe.component.css']
})
export class ServidorDetalheComponent implements OnInit {

  servidor: any;
  isLoading: boolean;
  exibeModalRecomendacao = false;
  verMais: any;
  habilidade: any;
  constructor(
      private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,
    private servidorService: ServidorService,
    private habilidadeService: HabilidadeService,
     private messageService: MessageService,
    private renderer: Renderer2,
     private authenticatedUserService: AuthenticatedUserService,
    private el: ElementRef,
  ) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.isLoading = true;
    this.servidorService.getByIdSemFoto(id,this.authenticatedUserService.getServidor().id).subscribe(servidor => {
      this.servidor = servidor;
     
      this.isLoading = false;
    });
    
    this.servidorService.getFotoById(id).subscribe(servidor => {
      delay(_ => this.updateBackgroundImage(servidor.foto));
      this.isLoading = false;
    });    
    
    // 
    this.initVerMais();
  }
  
  onClickDetalheRecomendacao(habilidade) :void{
    if(habilidade.numRecomendacoes > 0){
        this.exibeModalRecomendacao = true;
        this.habilidade = habilidade;
    }
  }
  
  podeRecomendar(): boolean {
      return this.servidor.id != this.authenticatedUserService.getServidor().id;
  }
  
  onClickRecomendacao(habilidade): void {
    var self = this;
     if(habilidade.recomendado == 1){
       this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover esta recomendação? \n',
      accept: () => {
        self.habilidadeService.removerRecomendacaoHabilidade(habilidade, this.authenticatedUserService.getServidor().id)
        .subscribe(function (success) {
            self.messageService.sendSuccess({ detail: 'Recomendação removida com sucesso.' });
            const find = self.servidor.habilidade.find(model => model.id === habilidade.id);
            find.recomendado  = 0;
            find.numRecomendacoes -= 1; 
        });
      },
      reject: () => { }
    });
     }else{
       self.habilidadeService.recomendarHabilidade(habilidade, this.authenticatedUserService.getServidor().id)
        .subscribe(function (success) {
            self.messageService.sendSuccess({ detail: 'Habilidade recomendada com sucesso.' });
            const find = self.servidor.habilidade.find(model => model.id === habilidade.id);
            find.recomendado  = 1;
            find.numRecomendacoes += 1; 
        });
     }
  }

  updateBackgroundImage(base64Img: string) {
    const element = this.el.nativeElement.querySelector('.servidor-foto');
    if (base64Img && element) {
      this.renderer.setStyle(element, 'background-image', `url('${base64Img}')`);
    }
  }

  initVerMais(): void {
    this.verMais = {
      cargos: false,
      funcoes: false,
      formacoes: false,
      capacitacoes: false,
      publicacoes: false,
    }
  }
  
  
  

  verMaisToggle(obj: any): void {

  }
}
