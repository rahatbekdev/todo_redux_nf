import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, editTodo, toggleTodo } from "../redux/todoSlice";
import addClick from "../sound/add.mp3";
import deleteClick from "../sound/deleted.wav";
import saveClick from "../sound/save.wav";
import editClick from "../sound/edit.mp3";
import styled from "styled-components";

const TodoListPage = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      const newTodo = { id: Date.now(), text: newTodoText, completed: false };
      dispatch(addTodo(newTodo));
      setNewTodoText("");
      playSound(addClick);
    }
  };

  const handleEditTodo = (id, text) => {
    setEditId(id);
    setEditText(text);
    playSound(editClick);
  };

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      dispatch(editTodo({ id, text: editText }));
      setEditId(null);
      setEditText("");
      playSound(saveClick);
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
    playSound(deleteClick);
  };

  return (
    <Container>
      <DivTwo>
        <Title>Список задач</Title>
        <AddContainer>
          <AddInput
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="ADD NEW TASK"
          />
          <AddButton onClick={handleAddTodo}>Добавить</AddButton>
        </AddContainer>
        <TodoList>
          {todos.map((todo) => (
            <TodoItem key={todo.id}>
              {editId === todo.id ? (
                <EditContainer>
                  <EditInput
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <SaveButton onClick={() => handleSaveEdit(todo.id)}>
                    save
                  </SaveButton>
                </EditContainer>
              ) : (
                <TaskContainer>
                  <TaskText
                    completed={todo.completed}
                    onClick={() => dispatch(toggleTodo(todo.id))}
                  >
                    {todo.text}
                  </TaskText>
                  <div>
                    <EditButton
                      onClick={() => handleEditTodo(todo.id, todo.text)}
                    >
                      edit
                    </EditButton>
                    <DeleteButton onClick={() => handleDeleteTodo(todo.id)}>
                      delete
                    </DeleteButton>
                  </div>
                </TaskContainer>
              )}
            </TodoItem>
          ))}
        </TodoList>
      </DivTwo>
    </Container>
  );
};

export default TodoListPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const DivTwo = styled.div`
  border: 2px solid red;
  border-radius: 10px;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: green;
  padding: 20px;
`;

const Title = styled.h2`
  color: white;
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const AddInput = styled.input`
  width: 350px;
  height: 40px;
  font-size: 18px;
  outline: none;
  padding-left: 10px;
  margin-right: 10px;
`;

const AddButton = styled.button`
  width: 100px;
  height: 45px;
  font-size: 16px;
  cursor: pointer;
  background-color: #303d94;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #489cd5;
  }
`;

const TodoList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const TodoItem = styled.li`
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TaskText = styled.span`
  font-size: 25px;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: ${(props)=>(props.completed ? "grey" : "")};
  cursor: pointer;
`;

const EditContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const EditInput = styled.input`
  width: calc(100% - 90px);
  height: 40px;
  font-size: 18px;
  outline: none;
  padding-left: 10px;
  margin-right: 10px;
`;

const EditButton = styled.button`
  width: 60px;
  height: 30px;
  background-color: #ffc107;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;
  margin-right: 10px;

  &:hover {
    background-color: #e0a800;
  }
`;

const SaveButton = styled.button`
  background-color: #008cba;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    background-color: #007b9e;
  }
`;

const DeleteButton = styled.button`
  width: 60px;
  height: 30px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    background-color: #d32f2f;
  }
`;
