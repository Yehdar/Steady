import React from "react";
import TaskInterface from "@/components/TaskInterface";

const Home: React.FC = () => {
  return (
    <div>
      <TaskInterface backendName="flask" />
    </div>
  );
};

export default Home;
