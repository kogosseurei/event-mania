import { renderToString } from 'react-dom/server';
import { createElement, type ReactElement } from 'react';
import { expect, it } from 'vitest';
import { useHasHydrated } from '@/hooks';
function ServerFixture():ReactElement {return createElement('span',null,String(useHasHydrated({})));}
it('renders the stable default when browser storage is unavailable',()=>{expect(renderToString(createElement(ServerFixture))).toContain('false');});
