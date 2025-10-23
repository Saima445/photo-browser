interface PicsumPhotoInfo {
  id: number;
  author: string;
  width: number;
  height: number;
  download_url: string;
}

export const getPicsumPhotoInfo = async (id: string): Promise<PicsumPhotoInfo> => {
  const res = await fetch(`https://picsum.photos/seed/${id}/info`);
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);

  return res.json();
};
