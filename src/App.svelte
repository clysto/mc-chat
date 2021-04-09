<script>
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte';
  import Login from './pages/Login.svelte';
  import Dashboard from './pages/Dashboard.svelte';
  import Signup from './pages/Signup.svelte';

  export let url = '';
</script>

<Router {url}>
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="login">Login</Link>
      </li>
      <li>
        <Link to="dashboard">Dashboard</Link>
      </li>
    </ul>
  </nav>
  <main>
    <Route path="login" component={Login} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="signup" component={Signup} />
    <Route path="/" component={Home} />
  </main>
</Router>

<style>
  nav {
    background-color: rgb(110, 79, 38);
    padding: 1.5em;
  }

  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  nav ul li {
    display: inline-block;
    padding: 0 1rem;
    font-size: 26px;
    font-weight: bold;
  }

  main {
    padding: 2.5rem;
  }
</style>
