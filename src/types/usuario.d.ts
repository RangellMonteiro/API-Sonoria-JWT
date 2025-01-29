// Tipo para sexo
export type Sexo = 'Masculino' | 'Feminino'

export type TipoUsuario = 'estudante' | 'profissional' | 'professor'

export interface UsuarioCreateInput {
  cpf: string
  nome: string
  email: string
  senha: string
  sexo: Sexo
  data_nascimento: Date
  tipo: TipoUsuario
  periodo: number
  especialidade: string
  registro_conselho: string
}
