interface IUsuarioEntity {
  id?: string
  cpf: string
  nome: string
  email: string
  senha: string
  tipo: string
  sexo: string
  data_nascimento: Date
  criado_em?: Date
  atualizado_em?: Date
}

export class Usuario {
  props: IUsuarioEntity

  constructor(props: IUsuarioEntity) {
    this.props = props
  }

  update(data: Partial<Omit<Usuario, 'id' | 'criado_em' | 'atualizado_em'>>): void {
    Object.assign(this, data)
    this.props.atualizado_em = new Date()
  }
}
