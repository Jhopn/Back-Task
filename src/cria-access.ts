import { prisma } from './connection/prisma.js';

async function criarAcesso() {
  try {
    const acessoAdmin = await prisma.access.upsert({
      where: { name: 'Admin' },
      update: {},
      create: { name: 'Admin' },
    });

    const acessoUsuario = await prisma.access.upsert({
      where: { name: 'Usuario' },
      update: {},
      create: { name: 'Usuario' },
    });

    console.log(`Acessos ${acessoAdmin.name} e ${acessoUsuario.name} criados com sucesso!`);
  } catch (error) {
    console.error('Erro ao criar o acesso:', error);
  } finally {
    await prisma.$disconnect();
  }
}

criarAcesso();