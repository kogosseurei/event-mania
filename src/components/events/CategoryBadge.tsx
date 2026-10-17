import type { ReactElement } from 'react';
import { categories } from '@/config';
import type { Category } from '@/types';
import { Badge } from '@/components/ui';
export interface CategoryBadgeProps {category:Category}
export function CategoryBadge({category}:CategoryBadgeProps):ReactElement {return <Badge className={`category-badge category-${category}`}>{categories.find((item)=>item.id===category)?.label??category}</Badge>;}