import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../../apis/TaskApi";

const UpdateTask = ({ task, close }) => {
  const [formData, setFormData] = useState({ title: task.title, description: task.description });
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
        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
        value={formData.title} 
        onChange={(e) => setFormData({...formData, title: e.target.value})} 
      />
      <textarea 
        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-24 transition"
        value={formData.description} 
        onChange={(e) => setFormData({...formData, description: e.target.value})} 
      />
      <div className="flex gap-3 pt-2">
        <button onClick={close} className="flex-1 px-4 py-2 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200">Cancel</button>
        <button 
          onClick={() => mutate(formData)} 
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
        >
          {isPending ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};
export default UpdateTask;