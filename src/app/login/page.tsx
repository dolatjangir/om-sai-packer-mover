import { Suspense } from "react";
import LoginClient from "./clientLogin";


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClient/>
    </Suspense>
  );
}