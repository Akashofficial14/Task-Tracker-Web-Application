import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getAllTasks } from "../apis/TaskApi";
import { getProfileData } from "../apis/ProfileData"; // Ensure this is the correct path
import CreateTask from "../components/crud/CreateTask";
import UpdateTask from "../components/crud/UpdateTask";
import DeleteTask from "../components/crud/DeleteTask";
import UpdateTaskStatus from "../components/crud/UpdateTaskStatus";

// New Profile Circle Component
const ProfileCircle = ({ name, onClick }) => {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <button 
      onClick={onClick}
      className="w-12 h-12 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-lg hover:scale-105 transition-all shadow-sm"
    >
      {initials || "U"}
    </button>
  );
};

const ModalWrapper = ({ isOpen, close, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] transition-opacity">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button onClick={close} className="text-gray-400 hover:text-gray-900 transition-colors text-2xl">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState({ type: null, data: null });

  // Fetch Tasks
  const { data: taskResponse, isLoading: tasksLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });

  // Fetch Profile (Same key as HomeLayout)
  const { data: profile } = useQuery({ 
    queryKey: ["profile"], 
    queryFn: getProfileData 
  });

  if (tasksLoading) return <div className="p-10 text-center text-gray-500">Syncing your workspace...</div>;

  const tasks = taskResponse?.tasks || [];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-16 md:py-12">
      <div className="max-w-9xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Task Dashboard</h1>
          <p className="text-gray-500 mt-2 text-lg">Manage, track, and complete your daily goals.</p>
        </div>
        
        {/* Header Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setModal({ type: "create" })}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-200 hover:shadow-indigo-300"
          >
            + Create Task
          </button>
          <ProfileCircle 
            name={profile?.name || "User"} 
            onClick={() => navigate("/task/profile")} // Adjust path to your profile route
          />
        </div>
      </div>

      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-100 p-5 rounded-2xl">
        <TaskColumn title="Pending" tasks={tasks.filter(t => t.status === "pending")} setModal={setModal} />
        <TaskColumn title="In Progress" tasks={tasks.filter(t => t.status === "in-progress")} setModal={setModal} />
        <TaskColumn title="Completed" tasks={tasks.filter(t => t.status === "completed")} setModal={setModal} />
      </div>

      <ModalWrapper isOpen={!!modal.type} close={() => setModal({ type: null, data: null })} title={modal.type?.toUpperCase() + " TASK"}>
        {modal.type === "create" && <CreateTask close={() => setModal({ type: null })} />}
        {modal.type === "update" && <UpdateTask task={modal.data} close={() => setModal({ type: null })} />}
        {modal.type === "status" && <UpdateTaskStatus task={modal.data} close={() => setModal({ type: null })} />}
        {modal.type === "delete" && <DeleteTask task={modal.data} close={() => setModal({ type: null })} />}
      </ModalWrapper>
    </div>
  );
};

const TaskColumn = ({ title, tasks, setModal }) => (
  <div className="flex flex-col gap-6">
    <h3 className="font-extrabold text-gray-400 uppercase tracking-widest text-sm">{title} ({tasks.length})</h3>
    {tasks.map((task) => (
      <div key={task._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
        <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">{task.title}</h4>
        <p className="text-gray-500 mb-6 leading-relaxed line-clamp-2">{task.description}</p>
        <div className="flex flex-col gap-3 pt-4 border-t border-gray-50">
          <span className="text-xs text-gray-300 font-bold uppercase">{new Date(task.createdAt).toLocaleDateString()}</span>
          <div className="flex gap-2">
            <button onClick={() => setModal({ type: "status", data: task })} className="flex-1 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100">Status</button>
            <button onClick={() => setModal({ type: "update", data: task })} className="flex-1 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200">Edit</button>
            <button onClick={() => setModal({ type: "delete", data: task })} className="flex-1 px-3 py-1.5 bg-gray-50 text-red-400 rounded-lg text-xs font-bold hover:bg-red-100">Delete</button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Dashboard;