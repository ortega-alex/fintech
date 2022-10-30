export const sessionAdapter = session => ({
    id_sesion: session.id_user,
    username: session.username,
    state: session.state
});
