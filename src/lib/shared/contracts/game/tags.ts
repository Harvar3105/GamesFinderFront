/** Response of GET /api/tags and of the backend Game/tags endpoint: every tag of the stored games, sorted. */
export interface TagsResponse {
  tags: string[];
}
