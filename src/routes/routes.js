const perguntas = []

async function routes(fastify) {

  //PERGUNTAS

  fastify.get('/', async (request, reply) => {
    reply.send('Crie perguntas e respostas, busque por elas e também delete.')
  })

  fastify.get('/perguntas', async (request, reply) => {
    reply.send(perguntas)
  })

  fastify.get('/perguntas/:id', async (request, reply) => {
    const { id } = request.params

    reply.send(perguntas[id])
  })

  fastify.post('/perguntas', async (request, reply) => {
    const { descricao } = request.body

    perguntas.push({
      id: (perguntas.length),
      pergunta: descricao,
      respostas: []
    })

    reply.send(perguntas)
  })

  fastify.delete('/perguntas/:id', async (request, reply) => {
    const { id } = request.params

    // if (!perguntas[id]) {
    //   reply.status(404).send({ message: `Pergunta com ID ${id} não encontrada` })
    //   return
    // }

    reply.send(`Pergunta com ID ${id} encontrada\n\n`, perguntas[id])

    perguntas = delete perguntas[id]
  })

  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  // RESPOSTAS

  fastify.get('/respostas', (request, reply) => {
    reply.send(perguntas)
  })

  fastify.get('/respostas/:id_pergunta/:id_resposta', (request, reply) => {
    const { id_pergunta, id_resposta } = request.params

    reply.send(perguntas[id_pergunta].respostas[id_resposta])
  })

  fastify.post('/respostas', (request, reply) => {
    const { id_pergunta, descricao } = request.body

    const respostas = {
      id_resposta: perguntas[id_pergunta].respostas.length,
      resposta: descricao
    }

    perguntas[id_pergunta].respostas.push(respostas)

    reply.send(perguntas[id_pergunta])
  })

  fastify.delete('/respostas/:id_resposta', (request, reply) => {
    const { id_pergunta } = request.body
    const { id_resposta } = request.params

    // if (perguntas[id_pergunta].respostas[id_resposta] === null) {
    //   reply.status(404).send({ message: `Pergunta com ID ${id} não encontrada` })
    //   return
    // }

    reply.send(perguntas[id_pergunta])

    perguntas[id_pergunta].respostas[id_resposta] = null
  })

}

export default routes