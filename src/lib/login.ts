import { fail, redirect, type Cookies } from '@sveltejs/kit'
import * as api from '$lib/api-client'
import { SINGHIS_ACCESS_TOKEN_KEY } from './constants'

interface LoginFnArgs {
  username: FormDataEntryValue
  password: FormDataEntryValue
  cookies: Cookies
}

export const login = async ({ username, password, cookies }: LoginFnArgs) => {
  const result = await api.post('/auth/login', { username, password })
  if (!result.data?.token) {
    return fail(400, { missing: true })
  }
  cookies.set(SINGHIS_ACCESS_TOKEN_KEY, result.data.token, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24
  })
  throw redirect(303, '/')
}
