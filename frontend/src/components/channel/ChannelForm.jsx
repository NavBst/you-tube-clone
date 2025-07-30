import React, { useEffect, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { channels } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const ChannelForm = ({ onSuccess }) => {
  const [channelData, setChannelData] = useState({
    name: "",
    description: "",
    handle: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, avatar } = e.target;
    setChannelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await channels.create(channelData);
      // Create channel with avatar URL
      console.log(res);
      if (res.status === 201) {
        onSuccess && onSuccess(res.data);
      }
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create channel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getChan = async (params) => {
      const channel = await channels.getMyChannel();
      if(channel){
        navigate('/channel')
      }
    };
  },[]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Your YouTube Channel</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Name */}
        <div>
          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Avatar Link
          </label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={channelData.avatar}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your channel avatar link"
            required
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Channel name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={channelData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your channel name"
            required
          />
        </div>

        {/* Channel Handle */}
        <div>
          <label
            htmlFor="handle"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Channel handle
          </label>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">@</span>
            <input
              type="text"
              id="handle"
              name="handle"
              value={channelData.handle}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your-channel-handle"
              required
            />
          </div>
        </div>

        {/* Channel Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={channelData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Tell viewers about your channel..."
          />
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm">{error}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 bg-blue-600 text-white font-medium rounded-lg transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating Channel..." : "Create Channel"}
        </button>
      </form>
    </div>
  );
};

export default ChannelForm;
