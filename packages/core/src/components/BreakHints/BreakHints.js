/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

const TOKEN = '<wbr>';

/**
 * Return a component with <wbr /> React tags in strategic places in the given string body,
 * which gives the browser hints about where to break lines. This is useful for long-running
 * things like IDs that are to be displayed.
 */
const BreakHints = ({ body }) => {
  const parts = body
    .replace(/([-_./])/g, (...match) => `${TOKEN}${match[1]}`)
    .replace(/([a-z])([A-Z])/g, (...match) => `${match[1]}${TOKEN}${match[2]}`)
    .split(TOKEN);
  let n = 0;
  const children = parts.reduce((comps, next) => {
    return [...comps, next, <wbr key={n++} />];
  }, []);
  // Remove unnecessary trailing <wbr> tag
  children.pop();
  return <>{children}</>;
};

export default BreakHints;
