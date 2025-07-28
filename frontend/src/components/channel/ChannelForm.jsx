import React, { useState } from 'react'
import { MdCloudUpload } from 'react-icons/md'

const ChannelForm = () => {
  const [channelData, setChannelData] = useState({
    name: '',
    description: '',
    handle: '',
    avatar: null
  })
  const [avatarPreview, setAvatarPreview] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setChannelData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setChannelData(prev => ({
        ...prev,
        avatar: file
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log(channelData)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Your YouTube Channel</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100">
            {avatarPreview ? (
              <img 
                src={avatarPreview} 
                alt="Channel Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <MdCloudUpload className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <label
            htmlFor="avatar"
            className="py-2 px-4 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Upload Channel Picture
          </label>
        </div>

        {/* Channel Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
          <label htmlFor="handle" className="block text-sm font-medium text-gray-700 mb-1">
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Channel
        </button>
      </form>
    </div>
  )
}

export default ChannelForm;