import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../../apis/TaskApi"; // Ensure your API supports the full object

const UpdateTaskStatus = ({ task, close }) => {
  const [formData, setFormData] = useState({ 
    title: task.title, 
    description: task.description, 
    status: task.status 
  });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => updateTask({ taskId: task._id, updatedData: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      close();
    }
  });

  return (
    <div className="space-y-4">
      <input 
        className="w-full p-3 border rounded-lg"
        value={formData.title} 
        onChange={(e) => setFormData({...formData, title: e.target.value})} 
      />
      <textarea 
        className="w-full p-3 border rounded-lg h-24"
        value={formData.description} 
        onChange={(e) => setFormData({...formData, description: e.target.value})} 
      />
      
      {/* Status Selection */}
      <select 
        className="w-full p-3 border rounded-lg bg-gray-50 font-bold text-gray-700"
        value={formData.status}
        onChange={(e) => setFormData({...formData, status: e.target.value})}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <div className="flex gap-3 pt-2">
        <button onClick={close} className="flex-1 px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
        <button 
          onClick={() => mutate(formData)} 
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          {isPending ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};
export default UpdateTaskStatus;