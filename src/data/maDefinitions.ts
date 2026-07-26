// Static, decoupled Macro Area dataset used by the survey navigation controller.
// Content is composed verbatim from the four data parts — do not mutate here.

import { maPart1 } from "./maPart1";
import { maPart2 } from "./maPart2";
import { maPart3 } from "./maPart3";
import { maPart4 } from "./maPart4";

export type MAEligibility = {
  ageGroups: string[];
  relationships: string[];
};

export type MAOption = {
  id: string;
  label: string;
  tag: string;
  variants: string[];
};

export type MALevel = {
  id: string;
  question: string;
  options: MAOption[];
};

export type MADefinition = {
  id: string;
  title: string;
  eligibility: MAEligibility;
  levels: MALevel[];
};

export const MA_CONFIG = maPart1.config;
export const SCREENING_QUESTIONS = maPart1.screeningQuestions;

export const MA_DEFINITIONS = [
  ...maPart1.macroAreas,
  ...maPart2.macroAreas,
  ...maPart3.macroAreas,
  ...maPart4.macroAreas,
] as unknown as MADefinition[];
