import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setRoomId(e.target.value);
  }
  const submitHandler = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push(`/game/${roomId}`);
    setRoomId("");
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" name="roomId" placeholder="enter the room ID" onChange={changeHandler} value={roomId}/>
        <button>enter</button>
      </form>
    </>
  )
}

export default Home;