export {}
declare global {
  namespace Express {
    interface Request {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user?: any
    }
  }
}
export type PrismaRepository = Omit<PrismaClient, ITXClientDenyList> | PrismaClient
