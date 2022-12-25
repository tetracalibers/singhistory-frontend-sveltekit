<script>
  import * as api from '$lib/api-client'

  let name = ''
  let password = ''
  let errorMsg = ''

  const handleSubmit = async () => {
    errorMsg = ''
    const result = await api.post('/users/create', { name, password })
    switch (result.statusCode) {
      case 201:
        console.log('Registration successfully')
        // TODO: ログイン処理を呼び出す
        break
      case 409:
        errorMsg = '既に存在するユーザーです。別なユーザー名とパスワードを登録してください。'
        break
      default:
        errorMsg = 'エラーが発生しました。もう一度お試しください。'
        break
    }
  }
</script>

{#if errorMsg}
  <div>{errorMsg}</div>
{/if}
<form method="POST" on:submit|preventDefault={handleSubmit}>
  <label for="singhis-username">User Name</label>
  <input
    type="text"
    name="name"
    placeholder="e.g.) tomixy"
    id="singhis-username"
    bind:value={name}
  />
  <label for="singhis-password">Password</label>
  <input type="password" name="password" id="singhis-password" bind:value={password} />
  <button>Register</button>
</form>
