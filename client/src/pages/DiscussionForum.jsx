import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FaRegCommentAlt, FaRegTrashAlt } from 'react-icons/fa';
import { BiUpvote } from 'react-icons/bi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { Link } from 'react-router-dom';

const DiscussionForum = () => {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: [] });
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('all');

  const API_URL = 'http://localhost:5000/api';

  const TAGS = [
    'Stocks', 'Crypto', 'Trading', 'Investment', 'Analysis', 
    'Market News', 'Technical', 'Fundamental', 'Portfolio'
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to post');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/posts`, {
        ...newPost,
        author: {
          name: user.displayName || user.email.split('@')[0],
          email: user.email
        }
      });
      setPosts([response.data, ...posts]);
      setNewPost({ title: '', content: '', tags: [] });
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

  const handleRemovePost = async (postId) => {
    if (!user) return;
    
    try {
      await axios.delete(`${API_URL}/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
      toast.success('Post removed successfully!');
    } catch (error) {
      console.error('Error removing post:', error);
      toast.error('Failed to remove post');
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!user) {
      toast.error('Please login to comment');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/posts/${postId}/comments`, {
        content: newComment,
        author: {
          name: user.displayName || user.email.split('@')[0],
          email: user.email
        }
      });
      const updatedPosts = posts.map(post => 
        post._id === postId ? response.data : post
      );
      setPosts(updatedPosts);
      setNewComment('');
      toast.success('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const handleLike = async (postId) => {
    if (!user) {
      toast.error('Please login to like posts');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/posts/${postId}/like`);
      const updatedPosts = posts.map(post => 
        post._id === postId ? response.data : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('Failed to like post');
    }
  };

  const filteredPosts = selectedTag === 'all' 
    ? posts 
    : posts.filter(post => post.tags?.includes(selectedTag));

  return (
    <div className="max-w-9xl mx-0 p-0 bg-gradient-to-r from-teal-200 to-teal-400">
      <div className="flex justify-between items-center bg-teal-900 mb-6 p-6  shadow-lg">
        
      <h2 className="text-3xl font-semibold text-white">
  <Link to="/">FinSynergy</Link>
</h2>
        <h2 className="text-2xl font-semibold text-white">FinTech Forum</h2>
        <div className="flex gap-2 text-white">
          {user ? (
            <span>Welcome, {user.displayName || user.email.split('@')[0]}</span>
          ) : (
            <span>Please login to participate</span>
          )}
        </div>
      </div>

      {/* Tags Filter */}
      <div className="mb-8 flex flex-wrap gap-4">
        <button
          onClick={() => setSelectedTag('all')}
          className={`px-4 py-2 rounded-lg text-lg ${
            selectedTag === 'all' 
              ? 'bg-teal-600 text-white shadow-lg' 
              : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
          }`}
        >
          All
        </button>
        {TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-lg text-lg ${
              selectedTag === tag 
                ? 'bg-teal-600 text-white shadow-lg' 
                : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Create New Post */}
      <div className="mb-12 bg-white p-8  shadow-lg  border-teal-500">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Create a New Post</h3>
        <form onSubmit={handlePostSubmit}>
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full p-4 mb-6 border-2 border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
          <textarea
            placeholder="Post Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="w-full p-4 mb-6 border-2 border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 h-40"
            required
          />
          <div className="mb-6">
            <p className="text-sm text-teal-600 mb-2">Select Tags:</p>
            <div className="flex flex-wrap gap-4">
              {TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    const updatedTags = newPost.tags.includes(tag)
                      ? newPost.tags.filter(t => t !== tag)
                      : [...newPost.tags, tag];
                    setNewPost({ ...newPost, tags: updatedTags });
                  }}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    newPost.tags.includes(tag)
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Create Post
          </button>
        </form>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-teal-500 mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredPosts.map((post) => (
            <div key={post._id} className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-teal-500">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">{post.title}</h3>
                  <div className="flex items-center text-sm text-teal-600">
                    <span>Posted by {post.author.name}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                {user?.email === post.author.email && (
                  <button
                    onClick={() => handleRemovePost(post._id)}
                    className="text-teal-400 hover:text-teal-700 p-2"
                  >
                    <FaRegTrashAlt />
                  </button>
                )}
              </div>

              <p className="text-gray-700 mb-6">{post.content}</p>

              {/* Tags */}
              {post.tags && (
                <div className="flex flex-wrap gap-3 mb-6">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-2  text-teal-700 rounded-full text-sm"
                    >
                      <MdOutlineLocalOffer className="inline mr-2" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-6 mb-6">
                <button
                  onClick={() => handleLike(post._id)}
                  className="flex items-center text-teal-600 hover:text-teal-700"
                >
                  <BiUpvote className="mr-2" />
                  Upvote
                </button>
                <span>{post.likes.length} Likes</span>
              </div>

              {/* Comments */}
              <div className="mb-6">
                {post.comments && post.comments.length > 0 && (
                  <div className="text-sm text-gray-600 mb-4">
                    <span>Comments ({post.comments.length})</span>
                  </div>
                )}

                {post.comments && post.comments.map((comment, index) => (
                  <div key={index} className="border-t-2 border-teal-100 pt-4">
                    <p className="text-sm text-gray-700 mb-2">{comment.author.name} said:</p>
                    <p className="text-sm text-gray-600">{comment.content}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="flex items-center gap-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-4 border-2 border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 h-32"
                ></textarea>
                <button
                  onClick={() => handleCommentSubmit(post._id)}
                  className="bg-white text-teal-950 px-8 py-3 rounded-lg hover:bg-teal-700"
                >
                  Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscussionForum;
