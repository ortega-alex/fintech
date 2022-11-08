export const sessionAdapter = session => ({
    id_sesion: session.id_user,
    username: session.username,
    full_name: session.full_name,
    state: session.state
});
