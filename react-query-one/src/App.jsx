import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
    staleTime: 4000,
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "content-type": "application/json; charset: UTF-8" },
      }).then((res) => res.json()),
    onSuccess: (newPost) => {
      queryClient.setQueryData(["posts"], (oldPosts) => [...oldPosts, newPost]);
    },
  });
  if (error || isError) <div>There is an error!</div>;
  if (isLoading) <div>DATA IS LOADING...</div>;

  return (
    <>
      {isPending && <p>DATA IS BEING LOADED...</p>}
      <button
        onClick={() =>
          mutate({
            userId: 5000,
            id: 4000,
            title: "Hey my name is Kaustubh",
            body: "This is the body of this post",
          })
        }
      >
        Add Posts
      </button>
      {data?.map((todo) => (
        <div>
          <h4>ID : {todo.id}</h4>
          <h4>TITLE : {todo.title}</h4>
          <p>{todo.body}</p>
        </div>
      ))}
    </>
  );
}

export default App;
