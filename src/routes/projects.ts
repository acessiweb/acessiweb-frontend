import { Project } from "@/types/project";
import {
  ApiError,
  FetchResponse,
  FetchUpdateResult,
  PaginationResponse,
} from "@/types/fetch";
import fetchData from "@/utils/fetch";
import { getAuthSession } from "./auth-server-session";

type FetchProjects = FetchResponse & {
  data: PaginationResponse & {
    data: Project[];
  };
};

type FetchProject = FetchResponse & {
  data: Project;
};

export async function createProject(body: {
  name: string;
  guidelines: string[];
  desc: string;
}): Promise<ApiError | FetchUpdateResult> {
  const token = await getAuthSession();

  return fetchData({
    endpoint: "projects",
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
): Promise<ApiError | FetchProject> {
  const token = await getAuthSession();

  return fetchData({
    endpoint: `projects/${projectId}`,
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
): Promise<ApiError | FetchUpdateResult> {
  const token = await getAuthSession();

  return fetchData({
    endpoint: `projects/${projectId}`,
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
}): Promise<FetchProjects | ApiError> {
  const token = await getAuthSession();

  return await fetchData({
    endpoint: `projects?keyword=${query?.keyword}&limit=${query?.limit}&offset=${query?.offset}&initialDate=${query?.initialDate}&endDate=${query?.endDate}`,
    config: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}

export async function getProject(id: string): Promise<FetchProject | ApiError> {
  const token = await getAuthSession();

  return await fetchData({
    endpoint: `projects/${id}`,
    config: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}
