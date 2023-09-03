const perguntas = [
  {
    "id": 1,
    "pergunta": "Qual é o nome do maior oceano do mundo?",
    "respostas": [
      {
        "id_resposta": 0,
        "resposta": "Pacífico"
      },
      {
        "id_resposta": 1,
        "resposta": "Atlântico"
      },
      {
        "id_resposta": 2,
        "resposta": "Índico"
      },
      {
        "id_resposta": 3,
        "resposta": "Ártico"
      }
    ]
  },
  {
    "id": 2,
    "pergunta": "Qual é o nome da montanha mais alta do mundo?",
    "respostas": [
      {
        "id_resposta": 0,
        "resposta": "Monte Everest"
      },
      {
        "id_resposta": 1,
        "resposta": "K2"
      },
      {
        "id_resposta": 2,
        "resposta": "Cho Oyu"
      },
      {
        "id_resposta": 3,
        "resposta": "Lhotse"
      }
    ]
  },
  {
    "id": 3,
    "pergunta": "Qual é o nome do animal mais rápido do mundo?",
    "respostas": [
      {
        "id_resposta": 0,
        "resposta": "Guepardo"
      },
      {
        "id_resposta": 1,
        "resposta": "Falcão peregrino"
      },
      {
        "id_resposta": 2,
        "resposta": "Gavião-real"
      },
      {
        "id_resposta": 3,
        "resposta": "Onça-pintada"
      }
    ]
  },
  {
    "id": 4,
    "pergunta": "Qual é o nome da flor mais bonita do mundo?",
    "respostas": [
      {
        "id_resposta": 0,
        "resposta": "Rosa"
      },
      {
        "id_resposta": 1,
        "resposta": "Orquídea"
      },
      {
        "id_resposta": 2,
        "resposta": "Tulipa"
      },
      {
        "id_resposta": 3,
        "resposta": "Camélia"
      }
    ]
  },
  {
    "id": 5,
    "pergunta": "Qual é o nome do livro mais vendido da história?",
    "respostas": [
      {
        "id_resposta": 0,
        "resposta": "A Bíblia"
      },
      {
        "id_resposta": 1,
        "resposta": "O Alcorão"
      },
      {
        "id_resposta": 2,
        "resposta": "O Livro do Conto de Genji"
      },
      {
        "id_resposta": 3,
        "resposta": "O Livro Vermelho"
      }
    ]
  }
]


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