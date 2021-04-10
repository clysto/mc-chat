<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';

  onMount(() => {
    navigate('/dashboard', { replace: true });
  });
</script>
