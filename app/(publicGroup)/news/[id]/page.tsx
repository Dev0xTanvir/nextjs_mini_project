import React from "react";

const newsidpage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>NewsbyidPage {id}</div>;
};

export default newsidpage;
