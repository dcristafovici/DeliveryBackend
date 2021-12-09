export interface DataResultsInterface {
  suggestions: SuggestElementInterface[];
}

export interface SuggestElementInterface {
  value: string;
  unrestricted_value: string;
  data: unknown;
}
