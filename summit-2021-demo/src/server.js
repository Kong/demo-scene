const fastify = require("fastify")({ logger: true });
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Declare a route
fastify.get("/health", async (request, reply) => {
  return { success: true };
});

fastify.get("/products", async (request, reply) => {
  return await prisma.product.findMany({
    select: { name: true, type: true, description: true },
  });
});

fastify.get("/sessions", async (request, reply) => {
  let sessions = await prisma.session.findMany({
    select: { title: true, description: true, presenters: true, date: true },
  });

  sessions = sessions.map((s) => {
    s.date = s.date.toISOString().slice(0, 10);
    return s;
  });

  if (request.query.date) {
    sessions = sessions.filter((s) => s.date == request.query.date);
  }

  return sessions;
});

fastify.get("/sessions/:id", async (request, reply) => {
  const s = await prisma.session.findFirst({
    select: { title: true, description: true, presenters: true, date: true },
    where: { id: Number(request.params.id) },
  });

  s.date = s.date.toISOString().slice(0, 10);
  return s;
});

fastify.listen(3000, "0.0.0.0", (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
