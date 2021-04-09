<script>
  import * as AV from 'leancloud-storage';
  let username = '';
  let password = '';

  function signup() {
    AV.User.signUp(username, password).then(
      () => {
        navigate('/dashboard');
      },
      (error) => {
        alert(JSON.stringify(error));
      }
    );
  }
</script>

<div>
  <h2>Signup</h2>
  <label for="">Username</label>
  <input
    id="username"
    name="username"
    type="text"
    bind:value={username}
    required
  />
  <label for="">Password</label>
  <input
    id="password"
    name="password"
    type="password"
    bind:value={password}
    required
  />
  <button on:click={signup}>Signup</button>
</div>
