import { ModelId } from '../../core';

export class Funcao {
  id: number;
  nome: string;
  orgao: ModelId;
  orgao_id: number;
  setor: string;
  atual: boolean;
  dataInicio: Date;
  dataFim: Date;
  descricao: string;
  servidor_id: number;
};
