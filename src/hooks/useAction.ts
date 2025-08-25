export default function useAction() {
  const handleDelete = async <T>(
    id: string,
    deleteFunction: (id: string) => Promise<T>,
    handleDeletion: (id: string) => void
  ) => {
    const deleted = await deleteFunction(id);

    if (
      deleted &&
      typeof deleted === "object" &&
      "id" in deleted &&
      typeof deleted.id === "string"
    ) {
      handleDeletion(deleted.id);
    }
  };

  return {
    handleDelete,
  };
}
