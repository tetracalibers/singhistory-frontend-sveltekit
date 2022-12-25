import type { Actions } from './$types'
import { login } from '@/lib/login'
import { fail } from '@sveltejs/kit'
import * as api from '$lib/api-client'

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')
    if (!username || !password) {
      return fail(401, { invalid: true })
    }
    const result = await api.post('/users/create', { name: username, password })
    switch (result.statusCode) {
      case 201:
        return login({ username, password, cookies })
      case 409:
        return fail(409, { alreadyExists: true })
      default:
        return fail(500, { serverError: true })
    }
  }
}
