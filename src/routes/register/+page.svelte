<script>
  import { enhance } from '$app/forms'

  /** @type {import('./$types').ActionData} */
  export let form
</script>

{#if form?.invalid}
  <div>入力されていない必須項目があります。</div>
{/if}
{#if form?.alreadyExists}
  <div>既に存在するユーザーです。別なユーザー名を登録してください。</div>
{/if}
{#if form?.serverError || form?.missing}
  <div>エラーが発生しました。もう一度お試しください。</div>
{/if}
<form method="POST" use:enhance>
  <label for="singhis-username">User Name</label>
  <input type="text" name="username" placeholder="e.g.) tomixy" id="singhis-username" />
  <label for="singhis-password">Password</label>
  <input type="password" name="password" id="singhis-password" />
  <button>Register</button>
</form>
