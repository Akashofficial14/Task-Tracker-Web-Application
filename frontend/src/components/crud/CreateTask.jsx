// components/crud/CreateTask.jsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../apis/TaskApi";

const CreateTask = ({ close }) => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Auto-refreshes dashboard
      close();
    }
  });

  return (
    <div className="space-y-4">
      <input 
        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
        placeholder="Task Title" 
        onChange={(e) => setFormData({...formData, title: e.target.value})} 
      />
      <textarea 
        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-24 transition"
        placeholder="Description" 
        onChange={(e) => setFormData({...formData, description: e.target.value})} 
      />
      <div className="flex gap-3 pt-2">
        <button onClick={close} className="flex-1 px-4 py-2 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition">Cancel</button>
        <button 
          onClick={() => mutate(formData)} 
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          {isPending ? "Creating..." : "Create Task"}
        </button>
      </div>
    </div>
  );
};
export default CreateTask;