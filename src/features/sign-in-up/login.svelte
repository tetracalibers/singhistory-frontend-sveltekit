<script>
  import * as api from '$lib/api-client'

  let username = ''
  let password = ''
  //let errorMsg = ''

  const handleSubmit = async () => {
    const result = await api.post('/auth/login', { username, password })
    console.log(result)
  }
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
  <label for="singhis-username">User Name</label>
  <input
    type="text"
    name="username"
    placeholder="e.g.) tomixy"
    id="singhis-username"
    bind:value={username}
  />
  <label for="singhis-password">Password</label>
  <input type="password" name="password" id="singhis-password" bind:value={password} />
  <button>Login</button>
</form>
