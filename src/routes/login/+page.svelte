<script>
  import { enhance } from '$app/forms'

  /** @type {import('./$types').ActionData} */
  export let form
</script>

{#if form?.missing}
  <div>存在しないユーザーです。入力内容を確かめるか、新規ユーザー登録をお試しください。</div>
{/if}
{#if form?.invalid}
  <div>入力されていない必須項目があります。</div>
{/if}
<form method="POST" use:enhance>
  <label for="singhis-username">User Name</label>
  <input type="text" name="username" placeholder="e.g.) tomixy" id="singhis-username" />
  <label for="singhis-password">Password</label>
  <input type="password" name="password" id="singhis-password" />
  <button>Login</button>
</form>
