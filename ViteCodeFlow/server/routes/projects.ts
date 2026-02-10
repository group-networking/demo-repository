import { RequestHandler } from "express";

export const handleProjects: RequestHandler = (_req, res) => {
  const projects = [
    { id: "1", name: "Projeto Alpha", description: "Exemplo de projeto A" },
    { id: "2", name: "Projeto Beta", description: "Exemplo de projeto B" },
    { id: "3", name: "Projeto Gamma", description: "Exemplo de projeto C" },
  ];

  res.status(200).json(projects);
};
