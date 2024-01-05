const express = require('express')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const cors = require('cors')
const bodyParser = require('body-parser')
const { default: axios } = require('axios')
const port = 5000


async function serverStart(){
    const app = express()
    app.use(bodyParser.json())
    app.use(cors())

    const server = new ApolloServer({
        typeDefs: `
           type Todo{
              id: ID!
              title: String!
              completed: Boolean
           }

           type Query{
             getTodos: [Todo]
           }
        `,
        resolvers: {
            Query: {
                getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
            }
        }
    })

    

   await server.start()
    
    app.use('/graphql', expressMiddleware(server))


   

    app.listen(port, () => {
        console.log('server running at 5000')
    })
}

serverStart();
