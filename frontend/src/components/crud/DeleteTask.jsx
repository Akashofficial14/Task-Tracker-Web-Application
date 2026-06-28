import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../apis/TaskApi";

const DeleteTask = ({ task, close }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      close();
    }
  });

  return (
    <div className="space-y-4">
      <p className="text-gray-600">Are you sure you want to permanently delete <strong>{task.title}</strong>? This action cannot be undone.</p>
      <div className="flex gap-3 pt-2">
        <button onClick={close} className="flex-1 px-4 py-2 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200">Cancel</button>
        <button 
          onClick={() => mutate(task._id)} 
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
        >
          {isPending ? "Deleting..." : "Yes, Delete Task"}
        </button>
      </div>
    </div>
  );
};
export default DeleteTask;