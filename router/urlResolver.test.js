import { isPathAvailable, getPathObject } from './urlResolver';

describe('urlResolver', () => {
  describe('isPathAvailable', () => {
    it('should return expected boolean on given or absence of paths', () => {
      expect(isPathAvailable('/')).toEqual(true);
      expect(isPathAvailable('/fake/path')).toEqual(false);
      expect(isPathAvailable()).toEqual(false);
    });
  });

  describe('getPathObject', () => {
    it('should return path object for existing paths', () => {
      expect(typeof getPathObject('/')).toEqual('object');
    });

    it('should return expected path object structure', () => {
      const pathObject = getPathObject('/');

      expect(typeof pathObject.canonical).toEqual('string');
      expect(Array.isArray(pathObject.breadcrumbs)).toEqual(true);
      expect(typeof pathObject.locale).toEqual('string');
      expect(typeof pathObject.params).toEqual('object');
      expect(typeof pathObject.params.component).toEqual('string');
    });
  });
});