export const downloadFile = async (url, filename) => {
  const resolvedUrl = new URL(url, window.location.href).toString();
  const mobileBrowser = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  if (mobileBrowser) {
    // Mobile browsers often block blob-driven PDF downloads unless the file is opened directly.
    window.location.href = resolvedUrl;
    return;
  }

  try {
    const response = await fetch(resolvedUrl, {
      credentials: "same-origin",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Download failed with status ${response.status}`);
    }

    const blob = await response.blob();
    const contentType = response.headers.get("content-type") ?? blob.type;

    if (!contentType.toLowerCase().includes("pdf")) {
      throw new Error("Downloaded file is not a PDF");
    }

    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);
    return;
  } catch {
    // Some mobile browsers still prefer opening the PDF directly.
    window.open(resolvedUrl, "_blank", "noopener,noreferrer");
  }
};
