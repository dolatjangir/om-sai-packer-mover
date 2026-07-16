import  { Suspense } from 'react'
import RegisterPage from './clientRegister'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <RegisterPage/>
    </Suspense>
  )
}
