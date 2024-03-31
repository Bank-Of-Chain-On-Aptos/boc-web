import { getJwt } from "./jwt";

export const storeAccountAddress = (jwt: string, accountAddress: string) => {
    localStorage.setItem(jwt, accountAddress);
}

export const getAccountAddress = () => {
    const jwt = getJwt();
    if (jwt) {
        return localStorage.getItem(jwt);
    }
    return null;
}

export const removeAccountAddress = (jwt: string): void => {
    localStorage.removeItem(jwt);
}
