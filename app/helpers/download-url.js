// The file service names the download after the physical file (<uuid>.csv)
// unless ?name= says otherwise.
export default function downloadUrl(id, filename) {
  return `/files/${id}/download?name=${encodeURIComponent(filename || '')}`;
}
