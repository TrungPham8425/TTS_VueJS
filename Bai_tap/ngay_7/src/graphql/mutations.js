import { gql } from "@apollo/client/core";

// Mutation để tạo một bài viết mới
export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input)
      @rest(type: "Post", path: "posts", method: "POST", bodyKey: "input") {
      id
      title
      body
      userId
    }
  }
`;

// Mutation để cập nhật thông tin bài viết
export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input)
      @rest(
        type: "Post"
        path: "/posts/{args.id}"
        method: "PUT"
        bodyKey: "input"
      ) {
      id
      title
      body
      userId
    }
  }
`;

// Mutation để xóa một bài viết
export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
      @rest(type: "Post", path: "/posts/{args.id}", method: "DELETE")
  }
`;
