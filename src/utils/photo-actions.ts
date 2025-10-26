import { toast } from "sonner";

interface PhotoShareParams {
  photoId?: number;
  title?: string;
}

interface PhotoDownloadParams {
  photoUrl: string;
  title?: string;
}

export const sharePhoto = async ({ photoId, title }: PhotoShareParams): Promise<void> => {
  try {
    const shareUrl = photoId ? `${window.location.origin}/photos/${photoId}` : window.location.href;

    if (!shareUrl) {
      toast.error("Missing URL");
      return;
    }

    if (navigator.share) {
      await navigator.share({
        text: "Check out this photo from Photo Browser!",
        title: title ? `Title: ${title}` : "Photo Browser",
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  } catch (err: any) {
    if (err?.name === "AbortError") return;
    console.error("Share failed:", err);
    toast.error("Failed to share the photo");
  }
};

export const downloadPhoto = async ({ photoUrl, title }: PhotoDownloadParams): Promise<void> => {
  try {
    if (!photoUrl) {
      toast.error("Missing photo URL");
      return;
    }

    //avoid cors issues
    const response = await fetch(photoUrl);
    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = title ? `${title.replace(/\s+/g, "_")}.jpg` : "photo.jpg"; // replace whitespace with _

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);

    toast.success("Photo downloaded");
  } catch (err) {
    console.error("Error downloading photo:", err);
    toast.error("Failed to download the photo");
  }
};
