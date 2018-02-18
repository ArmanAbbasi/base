import mapping from './mapping.json';

export const isPathAvailable = pathname => !!mapping[pathname];

export const getPathObject = pathname => mapping[pathname];