//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Cache from './cache';
import JSONSource from './json.source';
import { CACHE_PATH } from './config';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function cacheFactory() {
  const source = new JSONSource(CACHE_PATH);
  const cache = new Cache(source);
  return cache;
}
