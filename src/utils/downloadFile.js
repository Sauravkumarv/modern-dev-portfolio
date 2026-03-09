export const downloadFile = async (url, filename) => {
  const resolvedUrl = new URL(url, window.location.href).toString();

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
