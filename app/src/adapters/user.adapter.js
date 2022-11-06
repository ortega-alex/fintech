export const sessionAdapter = value => ({
    id_session: value.id_user,
    username: value.username,
    full_name: value.full_name,
    email: value.email
});
