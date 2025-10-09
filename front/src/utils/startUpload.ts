const startUpload = async (
  videoFile: File,
  metadata: { title: string; description: string },
): Promise<string> => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: metadata.title,
      description: metadata.description,
      videoSize: videoFile.size,
      videoType: videoFile.type,
    }),
  };

  const response = await fetch("http://localhost:4000/videos/start", request);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `O servidor respondeu com um erro: ${response.status} ${errorBody}`,
    );
  }

  const data: { uploadUrl: string } = await response.json();
  return data.uploadUrl;
};

export default startUpload;
