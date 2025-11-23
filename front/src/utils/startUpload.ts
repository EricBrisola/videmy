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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/start`,
    request,
  );

  if (!response.ok) {
    const errorBody = await response.json();
    console.log(errorBody);

    throw new Error(`Código: ${response.status} - ${errorBody.message}`);
  }

  const data: { uploadUrl: string } = await response.json();
  return data.uploadUrl;
};

export default startUpload;
