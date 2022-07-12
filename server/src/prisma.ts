import {PrismaClient} from '@prisma/client'

export const prisma = new PrismaClient({
    log: ['query'] //mostra no log o que o banco está fazendo
})