// TODO: Check the fields and status values against the backend scraping task contract.
export interface ScrapingTask {
  id: string;
  source: string;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
