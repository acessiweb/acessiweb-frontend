type ProjectProps = UrlParams & {
  projectName?: string;
  projectDescription?: string;
  projectFeedback?: string;
};

export default function Project({
  projectDescription,
  projectFeedback,
}: ProjectProps) {
  return (
    <div className="read-project">
      <p>{projectDescription}</p>
      {/* <CardList data={project.guidelines || []} /> */}
      <p>{projectFeedback}</p>
    </div>
  );
}
