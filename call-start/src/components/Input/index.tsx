/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps {
  placeholder: string
  type: string
  name: string
  register: UseFormRegister<any>
  error?: string
  rules?: RegisterOptions
}

const Input = ({
  name,
  placeholder,
  register,
  type,
  error,
  rules,
}: InputProps) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-2 rounded-md h-11 px-2"
        {...register(name, rules)}
        id={name}
      />
      {error && (
        <span className="text-red-500 my-1 font-medium text-sm">{error}</span>
      )}
    </>
  )
}

export default Input
