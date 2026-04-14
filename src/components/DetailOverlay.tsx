'use client';

import { useActiveProject } from '@/context/ActiveProjectContext';
import { projects } from '@/data/projects';
import ProjectDetailView from './ProjectDetailView';

export default function DetailOverlay() {
  const { openDetailId, setOpenDetailId } = useActiveProject();

  if (!openDetailId) return null;

  const project = projects.find(p => p.id === openDetailId);
  if (!project) return null;

  return (
    <ProjectDetailView
      project={project}
      onClose={() => setOpenDetailId(null)}
    />
  );
}
