async function routes(fastify) {
  fastify.get('/perguntas', function (request, reply) {
    reply.send({ pergunta: request.query.nome ?? "É sério isso?" })
  })

  fastify.get('/perguntas:descricao', function (request, reply) {
    reply.send({ pergunta: request.params.descricao })
  })
}

export default routes