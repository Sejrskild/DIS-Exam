import { UnauthorizedError } from "../errors/index.js";

const permissions = (user, userId) => {
    if (user.userId === userId.toString()) return;

    throw new UnauthorizedError('Ingen adgang, ikke tilknyttet din profil.')
};

export default permissions;
