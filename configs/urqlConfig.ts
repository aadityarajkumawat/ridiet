import { createClient } from 'urql'

const client = createClient({
    url: 'http://localhost:4001/graphql',
})

export { client }
