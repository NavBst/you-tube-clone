// src/components/video/AddVideoForm.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { channels, videos } from "../../utils/api"; // Import your video service
import { useNavigate } from "react-router-dom";

const AddVid = ({ onSuccess }) => {
  const { token, user } = useSelector((state) => state.auth);

  const [channelData, setChannelData] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    category: "",
    channelId: "",
    channelName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.toString() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg("");
    setLoading(true);
    try {
      // You might need to pass channelId if videos belong to channels
      const resp = await videos.create(form);
      setSuccessMsg("Video added successfully!");
      setForm({
        title: "",
        description: "",
        thumbnailUrl: "",
        videoUrl: "",
        category: "",
        channelId: channelData._id.toString(),
        channelName: channelData.name,
      });
      navigate("/channel");
      if (onSuccess) onSuccess(resp.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getdetails() {
      try {
        const res = await channels.getMyChannel();
        const obj = { ...form };
        obj.channelId = res?.data?.channel?._id.toString();
        obj.channelName = res?.data?.channel?.name;
        console.log(obj);
        setForm(obj);
        setChannelData(res.data.channel);
      } catch (er) {
        console.log(er);
      }
    }
    getdetails();
  }, [user]);

  if (!user || !token) {
    return <div className="p-4">Please login to add a video!</div>;
  }

  return (
    <form
      className="max-w-lg mx-auto p-6 bg-white shadow rounded space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold mb-2">Add New Video</h2>
      {error && <div className="text-red-600">{error}</div>}
      {successMsg && <div className="text-green-600">{successMsg}</div>}
      <input
        name="title"
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        rows={3}
        required
      />
      <input
        name="thumbnailUrl"
        type="text"
        placeholder="Thumbnail Image URL"
        value={form.thumbnailUrl}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <input
        name="videoUrl"
        type="text"
        placeholder="Video File URL"
        value={form.videoUrl}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <input
        name="category"
        type="text"
        placeholder="Category (e.g. Music, Sports, etc.)"
        value={form.category}
        onChange={handleChange}
        className="w-full p-3 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Uploading..." : "Add Video"}
      </button>
    </form>
  );
};

export default AddVid;
