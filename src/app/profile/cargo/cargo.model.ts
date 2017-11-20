import {ModelId} from '../../core';

export class Cargo {
  id: number;
  orgao: ModelId;
  setor: ModelId;
  orgao_id: number;
  setor_id: number;
  nome: string;
  atual: boolean;
  dataInicio: Date;
  dataFim: Date;
  servidor_id: number;
}
