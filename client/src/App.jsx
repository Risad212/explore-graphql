import './App.css'
import { useQuery, gql } from "@apollo/client";


const query = gql`
   query GetTodos{
    getTodos {
      title
      id
      completed
    }
   }
`;

function App() {
  const { data, loading } = useQuery(query)
  if (loading) { return <h2>loading....</h2> }

  console.log(data)
  return (
    <>
      <table>
        <tbody>
          {data.getTodos.map(todo => {
            return (
              <>
                <tr key={todo?.id}>
                  <td>{todo?.title}</td>
                  <td>{todo?.completed}</td>
                </tr>

              </>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default App
