//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Cache from './cache';
import JSONSource from '../json.source';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function cacheProvider(config) {
  const source = new JSONSource(config.CACHE_PATH);
  const cache = new Cache(source);

  return cache;
}

cacheProvider.inject = ['config'];
