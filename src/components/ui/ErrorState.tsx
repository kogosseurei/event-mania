import type { ReactElement } from 'react';
import { EmptyState } from './EmptyState';
import { Button } from './Button';
export interface ErrorStateProps {retry():void;message?:string}
export function ErrorState({retry,message='We could not load your events. Please try again.'}:ErrorStateProps):ReactElement {return <EmptyState title="A little interruption" description={message} action={<Button onClick={retry}>Try again</Button>}/>;}