'use client';
import type { ReactElement } from 'react';
import { CldImage } from 'next-cloudinary';
import { cloudinaryCloudName, imageSizes } from '@/lib/cloudinary';
import { Code2, Music2, Trophy, BriefcaseBusiness, Users, Palette, Sparkles } from 'lucide-react';
export interface CloudImageProps {publicId:string;alt:string;aspect?:'cover'|'wide'|'square';sizes?:string;priority?:boolean}
const artworkIcons={tech:Code2,sports:Trophy,music:Music2,careers:BriefcaseBusiness,clubs:Users,arts:Palette};
export function CloudImage({publicId,alt,aspect='cover',sizes=imageSizes,priority=false}:CloudImageProps):ReactElement {
 const category=publicId.split('/')[1]?.split('-')[0]??'tech';const Icon=artworkIcons[category as keyof typeof artworkIcons]??Sparkles;
 return <div className={`cloud-image aspect-${aspect} artwork-${category}`}>
 {cloudinaryCloudName ? <CldImage src={publicId} alt={alt} fill sizes={sizes} crop="fill" gravity="auto" quality="auto" format="auto" priority={priority}/> : <div className="artwork" role="img" aria-label={alt}><div className="artwork-orbit"/><div className="artwork-grid"/><Icon size={96} strokeWidth={1}/><span className="artwork-word">{category==='tech'?'BUILD WHAT’S NEXT':category==='music'?'FEEL THE MOMENT':category==='sports'?'PLAY YOUR PART':category==='careers'?'YOUR NEXT CHAPTER':category==='arts'?'A NEW PERSPECTIVE':'FIND YOUR PEOPLE'}</span><span className="artwork-caption">EXAMPLE UNIVERSITY · CAMPUS LIFE</span></div>}
 </div>;
}