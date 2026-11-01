"use client";

import { useState } from "react";
import { formatDateTime, formatTimeAgo } from "@/components/helpers/format";
import { Button, Chip, Panel, Select, Table, TableCell, TableHeader } from "@/components/ui";
import type { ScrapingTask } from "@/domain/entities/scrapingTask";

interface ScrapingTasksProps {
  sources: string[];
  tasks: ScrapingTask[];
}

export default function ScrapingTasks({ sources, tasks }: ScrapingTasksProps) {
  const [source, setSource] = useState("");

  const startScraping = () => {
    // FIXME: Start a scraping task through the BFF once the endpoint exists.
  };

  return (
    <Panel as="section" padding="none" aria-labelledby="tasks-title">
      <div className="flex flex-wrap items-center justify-between gap-related-md p-related-lg">
        <h2 id="tasks-title" className="typo-h2">
          Scraping tasks
        </h2>
        <div className="flex flex-wrap gap-related-sm">
          <Select
            aria-label="Source to scrape"
            fullWidth={false}
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="">All sources</option>
            {sources.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
          <Button variant="primary" onClick={startScraping}>
            Start scraping
          </Button>
        </div>
      </div>

      <Table minWidth={720}>
        <thead>
          <tr>
            <TableHeader>Task ID</TableHeader>
            <TableHeader>Source</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Created</TableHeader>
            <TableHeader>Updated</TableHeader>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <TableCell className="font-code">{task.id}</TableCell>
              <TableCell>{task.source}</TableCell>
              <TableCell>
                <Chip>{task.status}</Chip>
              </TableCell>
              <TableCell className="whitespace-nowrap">{formatDateTime(task.createdAt)}</TableCell>
              <TableCell className="whitespace-nowrap">{formatTimeAgo(task.updatedAt)}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </Panel>
  );
}
