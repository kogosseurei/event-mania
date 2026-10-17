import type { MatchExplainer } from './explainer';
import { ApiExplainer } from './ApiExplainer';
export const explainerProvider:MatchExplainer=new ApiExplainer();