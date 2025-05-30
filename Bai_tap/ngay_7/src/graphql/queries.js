import { gql } from "@apollo/client/core";

// Query để lấy danh sách tất cả các bài viết
export const GET_POSTS = gql`
  query GetPosts {
    posts @rest(type: "[Post]", path: "posts", method: "GET") {
      id
      title
      body
      userId
    }
  }
`;

// Query để lấy chi tiết một bài viết và các bình luận của nó
export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) @rest(type: "Post", path: "/posts/{args.id}", method: "GET") {
      id
      title
      body
      userId
    }
    comments(postId: $id)
      @rest(
        type: "[Comment]"
        path: "/posts/{args.id}/comments"
        method: "GET"
      ) {
      id
      name
      email
      body
    }
  }
`;
