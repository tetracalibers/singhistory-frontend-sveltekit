import type { PageServerLoad } from './$types'
import * as api from '$lib/api-client'
import { SINGHIS_ACCESS_TOKEN_KEY } from '@/lib/constants'

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get(SINGHIS_ACCESS_TOKEN_KEY)
  const history = await api.get('sing-history', token)
  console.log(history)
}
