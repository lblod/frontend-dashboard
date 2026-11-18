// Asks the service to run a report spec. The service checks the spec,
// answers 202 and makes the report in the background. Throws when the run
// did not start; the error carries the http status, if there was an answer.
export async function runReportSpec(id) {
  const res = await fetch(`/assistant/report-specs/${id}/run`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const error = new Error(`Run of report spec ${id} failed: ${res.status}`);
    error.status = res.status;
    throw error;
  }
}

// Picks the translation key that tells the user why the run did not start.
// No status (network down) counts as a plain failed start.
export function findRunErrorKey(error) {
  if (error.status === 404) return 'dashboard.report-assistant.run-not-found';
  if (error.status === 422) return 'dashboard.report-assistant.run-invalid';
  return 'dashboard.report-assistant.run-failed';
}
