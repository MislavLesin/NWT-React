import axios from "axios";
import { url } from "./url";

export async function GetRequest(setPosts) {
  const data = await axios
    .get(url)
    .then((res) => {
      console.log(res.data);
      setPosts(res.data);
    })
    .catch((error) => console.log(error));
}

export async function DeleteRequest(id) {
  await axios
    .delete(`${url}/${id}`)
    .then(console.log("Deleted post with id - " + id))
    .catch((error) => console.log(error));
}

export async function EditRequest(newPost, id) {
  await axios
    .put(`${url}/${id}`, newPost)
    .then(console.log("Updated post with id - " + id))
    .catch((error) => console.log(error));
}

export async function CreateRequest(newPost) {
  await axios
    .post("http://localhost:5000/posts", newPost)
    .then((Response) => console.log(Response))
    .catch((error) => console.log(error));
}
