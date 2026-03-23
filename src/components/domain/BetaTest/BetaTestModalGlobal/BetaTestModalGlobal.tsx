"use client";

import BetaTestModal from "../BetaTestModal/BetaTestModal";
import { useBetaTestFeedbackStore } from "@/store";

const BetaTestModalGlobal = () => {
  const { isOpen, closeBetaTestModal } = useBetaTestFeedbackStore();

  return <BetaTestModal isOpen={isOpen} onClose={closeBetaTestModal} />;
};

export default BetaTestModalGlobal;
