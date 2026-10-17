import { create } from 'zustand';
export interface ToastMessage { id:string; message:string; tone:'success'|'error'|'info'; actionLabel?:string; onAction?:()=>void; duration?:number }
interface ToastState { queue:ToastMessage[]; push(toast:Omit<ToastMessage,'id'>):void; dismiss(id:string):void }
let nextId=0;
export const useToastStore=create<ToastState>((set)=>({queue:[],push:(toast)=>set((state)=>({queue:[...state.queue,{...toast,id:String(++nextId)}].slice(-3)})),dismiss:(id)=>set((state)=>({queue:state.queue.filter((toast)=>toast.id!==id)}))}));