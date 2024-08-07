import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";
import { Navigate} from "react-router-dom";


function App() {
  const qc = useQueryClient()

  const query = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return new Promise<{ user: string }>((resolve) => {
        setTimeout(() => resolve({ user: "hello" }), 3000);
      });
    }
  })
  function logOut(){
    qc.setQueryData(["user"], {user:undefined})
  }
  const user = query.data?.user
  //  be careful to not put it under the id statements

  if(query.isPending) {
    return <div>Loading....</div>
  }
  if(!user) {
   return  <Navigate to="/signin" />
  }
  return (
    <div>
      <h1> HOME PAGE</h1>
      <h2>{user}</h2>
      <button onClick={logOut}>
        logout
      </button>
    </div>
  );
}

export default App;
