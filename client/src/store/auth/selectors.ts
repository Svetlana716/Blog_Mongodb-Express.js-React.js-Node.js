import { RootState } from "../store";

export const getAuthInfoPath = (store: RootState) => store.auth;
