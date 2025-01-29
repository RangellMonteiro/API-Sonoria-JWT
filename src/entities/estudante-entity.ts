interface IEstudanteEntity {
  usuarioId: string
  periodo: number
}

export class EstudanteEntity {
  constructor(public props: IEstudanteEntity) {
    this.props = props
  }
}
