export const sessionAdapter = value => ({
    session_id: value.user_id,
    username: value.username,
    full_name: value.full_name,
    email: value.email
});
