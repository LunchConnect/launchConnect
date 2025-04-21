// utils/applicationStatus.ts

const APPLICATION_STATUS_KEY = "job_application_statuses";

export const getApplicationStatus = (
  jobId: string
): "PENDING" | "ACCEPTED" | "REJECTED" => {
  if (typeof window === "undefined") return "PENDING";

  const statuses = JSON.parse(
    localStorage.getItem(APPLICATION_STATUS_KEY) || "{}"
  );
  return statuses[jobId] || "PENDING";
};

export const setApplicationStatus = (
  jobId: string,
  status: "PENDING" | "ACCEPTED" | "REJECTED"
) => {
  if (typeof window === "undefined") return;

  const statuses = JSON.parse(
    localStorage.getItem(APPLICATION_STATUS_KEY) || "{}"
  );
  statuses[jobId] = status;
  localStorage.setItem(APPLICATION_STATUS_KEY, JSON.stringify(statuses));
};
