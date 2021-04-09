<script>
  import { Link } from 'svelte-routing';
  import * as AV from 'leancloud-storage';
  import { navigate } from 'svelte-routing';
  export let location;
  let username = '';
  let password = '';
  function login() {
    AV.User.logIn(username, password).then(
      (user) => {
        console.log(user);
        if (location.state.from) {
          navigate(location.state.from);
        } else {
          navigate('/dashboard');
        }
      },
      (error) => {
        // TODO: catch the error
        alert(JSON.stringify(error));
      }
    );
  }
</script>

<div>
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
  <button on:click={login}>Login</button>
  <p>
    <Link to="/signup">Signup now -></Link>
  </p>
</div>
