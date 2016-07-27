//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Cache from './cache';
import JSONSource from '../json.source';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function cacheService(config) {
  const source = new JSONSource(config.CACHE_PATH);
  const cache = new Cache(source);

  return cache;
}

cacheService.inject = ['config'];
