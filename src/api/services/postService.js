import { use } from "react";
import { getFromLocal, saveToLocal } from "../../lib/locaStorageHelper";
import httpClient from "../httpClient";

const useMock = import.meta.env.VITE_USE_MOCK === "true";

const LOCAL_STORAGE_KEY = "posts";
if (useMock) {
  //const mockUser = JSON.parse(getFromLocal("authUser"));
}

const getPostsFromStorage = () => JSON.parse(getFromLocal("posts")) || [];

const savePostsToStorage = (posts) =>
  saveToLocal(LOCAL_STORAGE_KEY, JSON.stringify(posts));

// list all posts
export const getAllPosts = async () => {
  if (useMock) {
    const posts = getPostsFromStorage();
    return Promise.resolve({
      message:
        posts.length > 0 ? "Lista de posts gerada" : "Nenhum post encontrado",
      success: true,
      list: posts,
    });
  }
  try {
    const { data } = await httpClient.get("/posts");
    //console.log(data);
    return data;
  } catch (error) {
    //console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPublishedPosts = async () => {
  if (useMock) {
    const posts = getPostsFromStorage();
    const published = posts.filter((p) => p.published === true);
    return Promise.resolve({
      message: "Lista de posts gerada",
      posts: published,
      success: true,
    });
  }
  try {
    const { posts } = await httpClient.get("/posts/published");
    return posts;
  } catch (error) {
    console.error("Error fetching published posts:", error);
    throw error;
  }
};

export const createPost = async (postData) => {
  if (useMock) {
    const mockUser = JSON.parse(getFromLocal("authUser"));
    let posts = getPostsFromStorage();
    const newPost = {
      id: Date.now().toString(),
      user: mockUser ?? [],
      created_at: Date.now(),
      updated_at: Date.now(),
      ...postData,
    };
    posts.push(newPost);
    savePostsToStorage(posts);
    return Promise.resolve({
      post: newPost,
      success: true,
      message: "Post criado.",
    });
  }
  try {
    const { data } = await httpClient.post("/posts", postData);
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getPostById = async (postId) => {
  if (useMock) {
    const posts = getPostsFromStorage();
    const post = posts.find((p) => p.id === postId);
    console.log(post);
    if (post) {
      return Promise.resolve({
        success: true,
        post,
        message: "Post carregado.",
      });
    } else {
      return Promise.reject({
        success: false,
        message: "Post não encontrado",
        post: null,
      });
    }
  }
  try {
    const { data } = await httpClient.get(`/posts/${postId}`);
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

export const updatePost = async (postId, postData) => {
  if (useMock) {
    const posts = getPostsFromStorage();
    const index = posts.findIndex((p) => p.id == postId);
    if (index === -1)
      return Promise.reject({ message: "Post não encontrado.", sucess: false });
    postData.created_at = Date.now();
    postData.updated_at = Date.now();
    posts[index] = { ...posts[index], ...postData };
    savePostsToStorage(posts);
    return Promise.resolve({
      message: "Post atualizado com sucesso!",
      post: posts[index],
      success: true,
    });
  }
  try {
    const { data } = await httpClient.put(`/posts/${postId}`, postData);
    return data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  if (useMock) {
    let posts = getPostsFromStorage();
    posts = posts.filter((p) => p.id !== postId);
    savePostsToStorage(posts);
    return Promise.resolve({
      message: "Post deletado com sucesso!",
      success: true,
    });
  }
  try {
    const { data } = await httpClient.delete(`/posts/${postId}`);
    return data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
