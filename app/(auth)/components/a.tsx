// 'use client'

// import { useLoginMutation } from '@/store/auth/authApi'
// import { useState } from 'react'

// export default function AuthForm({ type }: { type: 'login' | 'register' }) {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [login] = useLoginMutation()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     await login({ email, password })
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="w-full p-3 rounded-lg bg-dark text-light"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full p-3 rounded-lg bg-dark text-light"
//       />
//       <button
//         type="submit"
//         className="w-full p-3 bg-primary text-dark font-semibold rounded-lg"
//       >
//         {type === 'login' ? 'Login' : 'Register'}
//       </button>
//     </form>
//   )
// }
