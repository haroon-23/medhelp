
export const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-50 text-green-700 border-green-200";
    case "Inactive":
      return "bg-gray-50 text-gray-700 border-gray-200";
    case "New":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Urgent":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "";
  }
};
