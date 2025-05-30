# Blog Management Application

A Vue.js application for managing blog posts using GraphQL and REST APIs.

## Features

- View list of blog posts
- View post details with comments
- Create new posts
- Edit existing posts
- Delete posts
- Real-time updates (simulated)
- Responsive design
- Error handling and retry mechanisms
- Offline support with localStorage

## Prerequisites

- Node.js (LTS version)
- npm or yarn

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd blog-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:

```
VUE_APP_GRAPHQL_URL=https://graphqlzero.almansi.me/api
VUE_APP_GRAPHQL_WS_URL=wss://graphqlzero.almansi.me/api
```

## Development

Run the development server:

```bash
npm run serve
```

The application will be available at `http://localhost:8080`

## Build

Build for production:

```bash
npm run build
```

## Project Structure

- `src/components/`: Vue components
  - `PostItem.vue`: Individual post display
  - `PostForm.vue`: Form for creating/editing posts
  - `PostList.vue`: List of posts
- `src/views/`: Page components
  - `Home.vue`: Home page
  - `Posts.vue`: Posts listing page
  - `PostDetail.vue`: Post detail page
- `src/apollo/`: Apollo Client configuration
- `src/graphql/`: GraphQL queries and mutations
- `src/api/`: API utilities (for REST fallback)

## Technologies Used

- Vue.js 3
- Vue Router
- Vue Apollo
- GraphQL
- Axios (for REST fallback)
- CSS3 with modern features

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
