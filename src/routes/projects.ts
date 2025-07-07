import { Project } from "@/types/project";
import { ApiError, PaginationResponse } from "@/types/response-api";
import fetchData from "@/utils/fetch";
import { getAuthSession } from "./auth-server-session";

type Projects = PaginationResponse & {
  data: Project[];
};

export async function createProject(body: {
  name: string;
  guidelines: string[];
  desc: string;
}): Promise<ApiError | { id: string }> {
  const token = await getAuthSession();

  return fetchData({
    endpoint: `common-users/me/projects`,
    config: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  });
}

export async function editProject(
  projectId: string,
  body: {
    name: string;
    guidelines: string[];
    desc: string;
    feedback: string;
  }
): Promise<ApiError | Project> {
  const token = await getAuthSession();

  return fetchData({
    endpoint: `common-users/me/projects/${projectId}`,
    config: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  });
}

export async function deleteProject(
  projectId: string
): Promise<ApiError | { id: string }> {
  const token = await getAuthSession();

  return fetchData({
    endpoint: `common-users/me/projects/${projectId}`,
    config: {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}

export async function getProjects(query: {
  userId?: string;
  keyword?: string;
  initialDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}): Promise<Projects | ApiError> {
  const token = await getAuthSession();

  return await fetchData({
    endpoint: `common-users/me/projects?keyword=${query?.keyword}&limit=${query?.limit}&offset=${query?.offset}`,
    config: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}

export async function getProject(id: string): Promise<Project | ApiError> {
  const token = await getAuthSession();

  return await fetchData({
    endpoint: `common-users/me/projects/${id}`,
    config: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}
