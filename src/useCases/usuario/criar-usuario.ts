import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { Usuario } from '../../entities/usuario-entity'
import { UsuarioRepository } from '../../repositories/usuario-repority'
import { UsuarioCreateInput } from '../../types/usuario'
import AppError from '../../error/app-error'
import { PrismaRepository } from '../../types/global'

export class CriarUsuario {
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  async execute(data: UsuarioCreateInput) {
    const prisma = new PrismaClient()

    return prisma.$transaction(async (connection) => {
      const usuarioRepository = new UsuarioRepository(connection)

      // Hash da senha antes de salvar no banco
      const hashedPassword = await this.hashPassword(data.senha)

      const verifyUserCPF = await usuarioRepository.findByCPF(data.cpf)
      if (verifyUserCPF) {
        AppError('CPF já cadastrado no sistema.')
      }

      const usuario = await usuarioRepository.create(
        new Usuario({
          cpf: data.cpf,
          data_nascimento: data.data_nascimento,
          email: data.email,
          nome: data.nome,
          senha: hashedPassword,
          sexo: data.sexo,
          tipo: data.tipo,
        }),
      )

      // Lógica para tipos de usuários
      switch (data.tipo) {
        case 'estudante':
          await this.criarEstudante(connection, usuario.id, data.periodo)
          break

        case 'profissional':
          await this.criarProfissional(connection, usuario.id, data.especialidade, data.registro_conselho)
          break

        case 'professor':
          // eslint-disable-next-line no-case-declarations
          const profissional = await this.criarProfissional(
            connection,
            usuario.id,
            data.especialidade,
            data.registro_conselho,
          )
          await this.criarProfessor(connection, usuario.id, profissional.id)
          break

        default:
          throw AppError('Tipo de usuário inválido.')
      }

      return usuario
    })
  }

  private async criarEstudante(connection: PrismaRepository, usuarioId: string, periodo: number) {
    return connection.estudante.create({
      data: {
        usuario_id: usuarioId,
        periodo: periodo,
      },
    })
  }

  private async criarProfissional(
    connection: PrismaRepository,
    usuarioId: string,
    especialidade: string,
    registro_conselho: string,
  ) {
    return connection.profissional.create({
      data: {
        usuario_id: usuarioId,
        especialidade: especialidade,
        registro_conselho: registro_conselho,
      },
    })
  }

  private async criarProfessor(connection: PrismaRepository, usuarioId: string, profissionalId: string) {
    return connection.professor.create({
      data: {
        usuario_id: usuarioId,
        profissional_id: profissionalId,
      },
    })
  }
}
