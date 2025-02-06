import { usuario } from '@prisma/client'
import { Usuario } from '../entities/usuario-entity'
import { PrismaRepository } from '../types/global'

export class UsuarioRepository {
  private prisma: PrismaRepository

  constructor(prisma: PrismaRepository) {
    this.prisma = prisma
  }

  async create(usuarioData: Omit<Usuario, 'id' | 'criado_em' | 'atualizado_em'>): Promise<usuario> {
    const usuarioCreated = await this.prisma.usuario.create({
      data: {
        ...usuarioData.props,
      },
    })
    return usuarioCreated
  }

  async findById(id: string): Promise<usuario | null> {
    const usuarioFound = await this.prisma.usuario.findUnique({
      where: { id },
    })
    return usuarioFound
  }

  async findByCPF(cpf: string): Promise<usuario | null> {
    const usuarioFound = await this.prisma.usuario.findUnique({
      where: { cpf },
    })
    return usuarioFound
  }

  async findByEmail(email: string): Promise<usuario | null> {
    const usuarioFound = await this.prisma.usuario.findUnique({
      where: { email },
    })
    return usuarioFound
  }

  async update(
    id: string,
    usuarioData: Partial<Omit<Usuario, 'id' | 'criado_em' | 'atualizado_em'>>,
  ): Promise<usuario> {
    const usuarioUpdated = await this.prisma.usuario.update({
      where: { id },
      data: {
        ...usuarioData,
      },
    })
    return usuarioUpdated
  }

  async delete(id: string): Promise<usuario> {
    const usuarioDeleted = await this.prisma.usuario.delete({
      where: { id },
    })
    return usuarioDeleted
  }

  async getAll(): Promise<usuario[]> {
    const usuarios = await this.prisma.usuario.findMany()
    return usuarios
  }
}
