export interface DeleteAccountType {
  reason: DeleteType[];
  otherReason?: string;
}

export type DeleteType =
  | "NOT_USING"
  | "LOW_TRUST"
  | "DIFFICULT_TO_USE"
  | "DUPLICATE_ACCOUNT"
  | "UNPLEASANT_USER"
  | "UNFAIR_RESTRICTION"
  | "OTHER";
