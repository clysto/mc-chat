<script>
  import { navigate } from 'svelte-routing';
  import * as AV from 'leancloud-storage';
  import { TrackModeSession, deviceManager, RoomState } from 'pili-rtc-web';
  export let location;

  let user = AV.User.current();

  if (!user) {
    navigate('/login', {
      state: {
        from: location.pathname,
      },
    });
  }

  /** @type TrackModeSession*/
  let roomSession;
  let localTracks;
  let player;
  let users = [];

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
</script>

{#if user}
  <div>
    <h1>{user.getUsername()}</h1>
    <button on:click={join}>加入通话</button>
    <button on:click={leave}>离开通话</button>

    {#each users as user}
      <li>
        {user.username}
      </li>
    {/each}

    <div bind:this={player} />
  </div>
{/if}
