/** Base of the backend entities. Dates come over JSON as ISO 8601 strings. */
export interface Entity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
