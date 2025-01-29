interface IProfissionalEntity {
  usuario_id: string
  especialidade: string
  registro_conselho: string
}

export class ProfissionalEntity {
  constructor(public props: IProfissionalEntity) {
    this.props = props
  }
}
