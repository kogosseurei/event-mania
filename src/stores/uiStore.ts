import { create } from 'zustand';
interface UiState { filterSheetOpen:boolean; setFilterSheetOpen(open:boolean):void }
export const useUiStore=create<UiState>((set)=>({filterSheetOpen:false,setFilterSheetOpen:(filterSheetOpen)=>set({filterSheetOpen})}));