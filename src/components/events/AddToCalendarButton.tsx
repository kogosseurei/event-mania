import type { ReactElement } from 'react';
import { CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui';
export interface AddToCalendarButtonProps {onDownload():void}
export function AddToCalendarButton({onDownload}:AddToCalendarButtonProps):ReactElement {return <Button variant="ghost" onClick={onDownload}><CalendarPlus size={16}/>Add to calendar</Button>;}