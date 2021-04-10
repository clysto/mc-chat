<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import * as AV from 'leancloud-storage';
  import { TrackModeSession, deviceManager, RoomState } from 'pili-rtc-web';
  export let location;

  let user = AV.User.current();

  onMount(() => {
    if (!user) {
      navigate('/login', {
        state: {
          from: location.pathname,
        },
      });
    }
  });

  /** @type TrackModeSession*/
  let roomSession;
  let localTracks;
  let player;
  let users = [
    // { username: 'clysto' },
    // { username: 'jack' },
    // { username: 'rose' },
  ];

  async function join() {
    roomSession = new TrackModeSession();
    const { token } = await AV.Cloud.run('token');
    try {
      await roomSession.joinRoomWithToken(token, user.getUsername());
    } catch (err) {
      alert(err.message);
      return;
    }
    localTracks = await deviceManager.getLocalTracks({
      audio: { enabled: true, tag: 'audio' },
    });
    await roomSession.publish(localTracks);
    addTracks(roomSession.trackInfoList);
    roomSession.on('track-add', addTracks);
    roomSession.on('user-leave', refreshUsers);
    refreshUsers();
  }

  async function addTracks(trackInfoList) {
    const subscribedTracks = await roomSession.subscribe(
      trackInfoList
        .filter((trackInfo) => trackInfo.tag === 'audio')
        .map((trackInfo) => trackInfo.trackId)
    );
    subscribedTracks.forEach((track) => {
      track.play(player);
    });
    refreshUsers();
  }

  function leave() {
    Object.values(localTracks).forEach((track) => {
      track.release();
    });
    roomSession.leaveRoom();
    roomSession = undefined;
    localTracks = undefined;
    users = [];
  }

  function refreshUsers() {
    users = [];
    roomSession.users.map((user) => {
      users.push({ id: user.userId, username: user.userData });
    });
    users = [...users];
  }

  function signout() {
    AV.User.logOut().then(() => {
      navigate('/login');
    });
  }
</script>

{#if user}
  <div>
    <div
      class="flex items-center justify-center mb-6 bg-gray-100 rounded-md py-4 flex-col"
    >
      <div
        class="rounded-full w-16 h-16 bg-gray-200 justify-center items-center flex"
      >
        <h1 class="font-bold text-3xl">
          {user.getUsername()[0].toUpperCase()}
        </h1>
      </div>
      <p class="mt-3">
        Welcome {user.getUsername()}!
      </p>
    </div>

    {#if roomSession}
      <button on:click={leave} class="w-full"
        ><i class="bi bi-telephone-x-fill" /> Leave</button
      >
    {:else}
      <button on:click={join} class="w-full"
        ><i class="bi bi-telephone-plus-fill" /> Join</button
      >
    {/if}
    <button class="w-full mt-4 bg-red-800 hover:bg-red-900" on:click={signout}
      ><i class="bi bi-dash-circle-fill" /> Sign Out</button
    >

    {#if roomSession}
      <p class="text-gray-500 text-sm mt-8">Online Users:</p>
      {#if users.length}
        <div class="border-t border-b py-1">
          <ul>
            {#each users as user}
              <li class="my-2 flex">
                {user.username}
                <span class="flex-1" />
                <i class="bi bi-mic-fill animate-pulse text-purple-700" />
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    {/if}

    <div bind:this={player} />
  </div>
{/if}
