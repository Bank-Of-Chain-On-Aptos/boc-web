import { jwtDecode } from "jwt-decode";
import { getLocalEphemeralKeyPair } from "./keypair";

export const parseJWTFromURL = (url: string): string | null => {
  const urlObject = new URL(url);
  const fragment = urlObject.hash.substring(1);
  const params = new URLSearchParams(fragment);
  const jwt =  params.get('id_token')
  storeJwt(jwt);
  return jwt;
};

export const storeJwt = (
  jwt: string | null
): void => {
  if (!jwt) {
    console.error('Blank jwt!')
    return;
  }
  localStorage.setItem('jwt', jwt);
}

export const getJwt = (): string | null => {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) {
    console.error('Blank jwt!')
    return null;
  }
  return validateJwt(jwt);
}

export const validateJwt = (jwt: string): string | null => {
  const nonce = extractJwtNonce(jwt);
  if (nonce) {
    const ephemeralKeyPair = getLocalEphemeralKeyPair(nonce);
    // not expire
    if (ephemeralKeyPair) {
      return jwt;
    }
  }
  return null;
}

export const extractJwtNonce = (jwt: string): string | null => {
  if (jwt) {
    const payload = jwtDecode<{ nonce: string }>(jwt);
    return payload.nonce;
  }
  return null;
}

export const removeJwt = (): void => {
  localStorage.removeItem('jwt');
}
