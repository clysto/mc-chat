<script>
  import { Link } from 'svelte-routing';
  import * as AV from 'leancloud-storage';
  import { navigate } from 'svelte-routing';
  export let location;
  let username = '';
  let password = '';
  let errorMsg = '';

  function login() {
    if (!username || !password) {
      return;
    }
    AV.User.logIn(username, password).then(
      () => {
        if (location.state && location.state.from) {
          navigate(location.state.from);
        } else {
          navigate('/dashboard');
        }
      },
      (error) => {
        errorMsg = error.rawMessage;
      }
    );
  }

  function reset() {
    password = '';
    username = '';
  }

  $: removeError(username, password);

  function removeError(username, password) {
    errorMsg = '';
  }
</script>

<div>
  <h2 class="text-center text-4xl font-bold mb-6 underline logo-font">Login</h2>
  <div class="mb-4">
    <label for="username" class="block text-sm">Username</label>
    <input
      class="w-full"
      id="username"
      name="username"
      type="text"
      bind:value={username}
      required
    />
  </div>
  <div class="mb-4">
    <label for="password" class="block text-sm">Password</label>
    <input
      class="w-full"
      id="password"
      name="password"
      type="password"
      bind:value={password}
      required
    />
  </div>
  <div class="my-2">
    {#if errorMsg}
      <p class="text-red-900 mb-4 bg-red-100 rounded-md p-4">{errorMsg}</p>
    {:else}
      <p class="h-4" />
    {/if}
  </div>
  <div>
    <button
      on:click={login}
      class={`w-full mb-4 ${
        !username || !password
          ? 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed'
          : ''
      }`}>Login</button
    >
    <button class="w-full bg-gray-400 hover:bg-gray-500" on:click={reset}
      >Reset</button
    >
  </div>
  <p class="pt-6">
    <Link to="/signup" class="text-blue-700 underline">Signup now ---></Link>
  </p>
</div>
