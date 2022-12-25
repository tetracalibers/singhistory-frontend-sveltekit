import { SINGHIS_ACCESS_TOKEN_KEY } from '$lib/constants'
import type { Actions } from './$types'
import * as api from '$lib/api-client'
import { fail, redirect } from '@sveltejs/kit'

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')
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
}
