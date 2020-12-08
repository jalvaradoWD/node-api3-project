// code away!
const { server, PORT } = require("./server.js");
const userRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");

server.use("/api/users", userRouter);
server.use("/api/posts", postsRouter);

server.listen(PORT, () => console.log(`Server is on http://localhost:${PORT}`));
