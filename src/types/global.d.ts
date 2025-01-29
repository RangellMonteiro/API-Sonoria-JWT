type PrismaRepository = Omit<PrismaClient, ITXClientDenyList> | PrismaClient
