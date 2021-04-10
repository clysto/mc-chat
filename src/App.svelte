<script>
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte';
  import Login from './pages/Login.svelte';
  import Dashboard from './pages/Dashboard.svelte';
  import Signup from './pages/Signup.svelte';

  export let url = '';
</script>

<Router {url}>
  <div class="">
    <div
      class="shadow-lg w-96 rounded-xl bg-white my-4 mx-auto overflow-hidden"
    >
      <nav
        class="bg-purple-800 text-3xl text-white py-4 px-4 font-bold text-center shadow-md logo-font text-shadow"
      >
        Minetalk
      </nav>
      <main class="p-8">
        <Route path="login" component={Login} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="signup" component={Signup} />
        <Route path="/" component={Home} />
      </main>
    </div>
  </div>
</Router>
