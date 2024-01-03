import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TodoItem from "../components/todoitem";

const Todo = () => {
  const [Tasktext, setTasktext] = useState("");
  const [TodoList, setTodoList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/todo", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res.todos);
        setTodoList(res.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(TodoList);

  const deleteHandler = (id) => {
    fetch(`http://localhost:5001/todo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setTodoList(TodoList.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addHandler = () => {
    if (Tasktext === "") {
      alert("Please enter a task");
      return;
    }
    fetch("http://localhost:5001/todo", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: Tasktext }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setTodoList([
          ...TodoList,
          { completed: false, text: Tasktext, _id: res._id },
        ]);
        setTasktext("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const completedHandler = (id) => {
    console.log("body: ", {
      text: TodoList.find((item) => item._id === id).text,
      completed: !TodoList.find((item) => item._id === id).completed,
    });
    fetch(`http://localhost:5001/todo/${id}`, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: TodoList.find((item) => item._id === id).text,
        completed: !TodoList.find((item) => item._id === id).completed,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setTodoList(
          TodoList.map((item) => {
            if (item._id === id) {
              return { ...item, completed: !item.completed };
            }
            return item;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const logoutHandler = () => {
    setTodoList([]);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };
  return (
    <>
      <div className="w-screen h-screen blob-containter">
        <div className="blob"></div>
        <div className="blob2"></div>
        <div className="flex justify-center items-center h-full w-full">
          <button
            onClick={logoutHandler}
            className="absolute top-0 m-4 px-4 py-2 font-bold text-white right-0 bg-violet-600 rounded-sm hover:bg-violet-800"
          >
            Logout
          </button>
          <div className="text-center rounded backdrop-blur-sm bg-white/20 px-8 py-4 h-[80%] w-[30%] flex flex-col items-center justify-start">
            <h1 className="select-none text-white text-xl font-bold my-4">
              <div className="capitalize flex justify-center items-center">
                Hi {username}
                <span className="select-none material-symbols-outlined px-1">
                  waving_hand
                </span>
                ,
              </div>
              <div className="capitalize">Welcome to your Todo-List</div>
            </h1>
            <div className="flex w-full">
              <input
                className=" p-2 min-h-12 rounded-sm w-[80%] focus:outline-none focus:ring-2 focus:ring-violet-600 font-semibold text-lg"
                type="text"
                value={Tasktext}
                placeholder="Add your task here"
                onChange={(e) => setTasktext(e.target.value)}
              />
              <div
                onClick={addHandler}
                className="ml-1 rounded-sm bg-violet-600 w-[20%] flex items-center justify-center hover:cursor-pointer hover:bg-violet-800 text-white"
              >
                <span className="select-none material-symbols-outlined">
                  add
                </span>
              </div>
            </div>
            <div className="w-full mt-4 py-2 overflow-y-auto max-h-96 ">
              {TodoList.map((item) => (
                <TodoItem
                  key={item._id}
                  text={item.text}
                  completed={item.completed}
                  id={item._id}
                  deleteHandler={deleteHandler}
                  completedHandler={completedHandler}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
