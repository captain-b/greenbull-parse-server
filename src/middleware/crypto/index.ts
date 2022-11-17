import {compareSync, genSaltSync, hashSync} from "bcrypt";

export const Hash = (string: string): string => {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    return hashSync(string, salt);
}

export const CompareHash = (string: string, hash: string): boolean => {
    return compareSync(string, hash);
}