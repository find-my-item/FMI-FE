const formatTime = (dateString: string) => {
  if (!dateString || !dateString.includes("T")) {
    return "";
  }

  const timePart = dateString.split("T")[1];

  const [hour, minute] = timePart.split(":");

  return `${hour}:${minute}`;
};

export default formatTime;
