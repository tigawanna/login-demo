import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SigninProps {}

export function Signin({}: SigninProps) {
const navigate = useNavigate()
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (vars: { email: string; password: string }) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ user: "hello", email: vars.email }), 3000);
      });
    },
    onSuccess: () => {
    //   qc.invalidateQueries({
    //     queryKey: ["user"],
    //   });
    qc.setQueryData(["user"], { user: "hello" });
      navigate("/")
    },
  });
  const [input, setInput] = useState({
    email: "hello@email.com",
    password: "supaer_secret_password",
  });
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(input);
    mutation.mutate(input);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" name="email" value={input.email} required onChange={handleChange} />
        <input
          type="password"
          name="password"
          value={input.password}
          required
          onChange={handleChange}
        />
        <button type="submit">{mutation.isPending?"Logging in...":"Login"}</button>
      </form>
    </div>
  );
}
