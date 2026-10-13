
const http = require("http");
const fs = require("fs");
const dotenv = require('dotenv')
 
 
dotenv.config()
const PORT = process.env.PORT;


interface User {
  id: number;
  name: string;
  email: string;
}

async function readUsers(){
  const data = await fs.promises.readFile(
    "./mock-users.json",
    "utf-8"
  );

  return JSON.parse(data) as User[];
}

const server = http.createServer(async (req: any, res: any) => {
  try {
    if (req.method === "GET" && req.url === "/users") {
      const users = await readUsers();

      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify(users));
    }
    else if (req.method === "GET" && req.url === "/") {
      

      res.writeHead(200, {
        "Content-Type": "application/json"
      });
     res.end(JSON.stringify({
        message: "Welcome to the Taskflow Backend API"
      }));
       
    }
    else {
      res.writeHead(404, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        message: "Route not found"
      }));
    }
  } catch (error) {
    console.error("Server error:", error);

    res.writeHead(500, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
      message: "Internal server error"
    }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
