import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const LoginForm = () => {
  const router=useRouter();
  const BASE_URL="https://honobackendtodoapp.noa240240.workers.dev/api"
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleChangeEmail:React.ChangeEventHandler<HTMLInputElement>=(e)=>{
    setEmail(e.target.value)
  }
  const handleChangePassword:React.ChangeEventHandler<HTMLInputElement>=(e)=>{
    setPassword(e.target.value)
  }
  const handleLogin:React.MouseEventHandler<HTMLButtonElement>=async(e)=>{
    e.preventDefault();
    const data={email,password}
    const res=await axios.post(`${BASE_URL}/auth/login`,data)
    if(res.data.username==="Email is not found"){
      console.log(res.data.message)
      return
    }
    if(res.data.username==="Password does not match"){
      return
    }
    return [
      localStorage.setItem("username",res.data.username),
      router.push(`/account/${res.data.username}`),
    ]
  }
  useEffect(()=>{
    if(typeof localStorage !== "undefined"){
      const storageUsername=localStorage.getItem("username")
      if(storageUsername && storageUsername!==""){
        router.push(`/account/${storageUsername}`)
      }
    }
  },[router])
  return (
    <form action="">
      <div>
        <label htmlFor="email" className='block text-black'>メールアドレス</label>
        <input type="email" id="email" name='email' autoComplete='email' value={email} onChange={handleChangeEmail} />
      </div>
      <div>
        <label htmlFor="password" className='block text-black'>パスワード</label>
        <input type="password" id="password" name='password' autoComplete='password' value={password} onChange={handleChangePassword} />
      </div>
      <button type='submit' onClick={handleLogin}
        className='text-white bg-blue-600 rounded-md p-2 pb-2.5'
      >
        ログイン
      </button>
    </form>
  )
}

export default LoginForm;