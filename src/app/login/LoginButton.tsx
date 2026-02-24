"use client";

import { LoginValidation} from "@/actions/login";
export function LoginButton(props: {
  email: string,
  password: string
}) {

  return (
      <>
          <button className="btn-neutral btn btn-block" onClick = {() => {LoginValidation(props.email,props.password);}}>
          </button>
      </>

  );
}
