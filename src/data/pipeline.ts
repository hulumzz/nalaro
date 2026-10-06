// src/data/pipeline.ts

export interface PipelineStage {
  id: string;
  label: string;
  order: number;
}

export const pipelineStages: PipelineStage[] = [
  { id: "idea", label: "IDEA", order: 0 },
  { id: "experiment", label: "EXPERIMENT", order: 1 },
  { id: "lab", label: "LAB", order: 2 },
  { id: "product", label: "PRODUCT", order: 3 },
];
