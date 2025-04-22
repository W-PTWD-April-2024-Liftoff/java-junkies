export const buildAuthHeader = async ({getAccessTokenSilently}) => {
    const passwordLogin = localStorage.getItem('passwordLogin') === 'true';
    let headers = {
        'Content-Type': 'application/json',
    };
    if (!passwordLogin) {
        const JWTtoken = await getAccessTokenSilently({
            audience: "https://intheloop-auth0api.com",
            scope: "read:posts"
        });
        headers.Authorization = `Bearer ${JWTtoken}`;
    }
    return headers;
}