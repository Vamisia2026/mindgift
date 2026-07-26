import { createContext, useContext, type ReactNode } from "react";
import {
  useSurveyNavigation,
  type UserProfile,
} from "@/hooks/useSurveyNavigation";

type SurveyController = ReturnType<typeof useSurveyNavigation>;

const SurveyContext = createContext<SurveyController | null>(null);

export function SurveyProvider({
  profile,
  children,
}: {
  profile: UserProfile;
  children: ReactNode;
}) {
  const controller = useSurveyNavigation(profile);
  return (
    <SurveyContext.Provider value={controller}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey(): SurveyController {
  const ctx = useContext(SurveyContext);
  if (!ctx) {
    throw new Error("useSurvey must be used inside <SurveyProvider>");
  }
  return ctx;
}
