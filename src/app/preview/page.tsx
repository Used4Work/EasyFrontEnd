import { RenderPage } from "@/components/rendered/RenderPage";
import { sampleProject } from "@/lib/dsl/sampleProjects";

export default function PreviewPage() {
  return <RenderPage project={sampleProject} />;
}
