import type { Actions } from './$types'
import { login } from '@/lib/login'
import { fail } from '@sveltejs/kit'

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')
    if (!username || !password) {
      return fail(401, { invalid: true })
    }
    return login({ username, password, cookies })
  }
}
