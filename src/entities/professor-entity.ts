interface IProfessorEntity {
  usuarioId: string
  profissionalId: string
}

export class ProfessorEntity {
  constructor(public props: IProfessorEntity) {
    this.props = props
  }
}
