export const sessionAdapter = session => ({
    session_id: session.user_id,
    username: session.username,
    full_name: session.full_name,
    state: session.state
});
