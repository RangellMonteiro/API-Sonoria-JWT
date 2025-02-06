import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { CriarUsuario } from '../../useCases/usuario/criar-usuario'
import { UsuarioCreateInput } from '../../types/usuario'
import AppError from '../../error/app-error'

const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export class UsuarioController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const criarUsuario = new CriarUsuario();
      await criarUsuario.execute(data);
      res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf, senha } = req.body;

      const usuario = await prisma.usuario.findUnique({
        where: { cpf },
      });

      if (!usuario) {
        throw new AppError('Usuário não encontrado', 404);
      }

      const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
      if (!isPasswordValid) {
        throw new AppError('Senha inválida', 401);
      }

      if (!process.env.SECRET_KEY_JWT) {
        throw new AppError('Chave secreta JWT não configurada', 500);
      }

      const token = this.generateToken(usuario.id, usuario.cpf)

      res.status(200).json({
        usuario: {
          id: usuario.id,
          cpf: usuario.cpf,
          nome: usuario.nome,
          email: usuario.email,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response) {
    res.json({ user: req.user });
  }

  private generateToken(id: string, cpf: string): string {
    return jwt.sign({ id, cpf }, process.env.SECRET_KEY_JWT!, {
      expiresIn: '8h',
    })
  }
}