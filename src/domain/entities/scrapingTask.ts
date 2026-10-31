// TODO: [Stage6] The backend has no scraping task contract; scraping requests return 201 without a body.
export interface ScrapingTask {
  id: string;
  source: string;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
