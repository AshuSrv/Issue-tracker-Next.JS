"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneSelect = () => {
  const [users, setUser] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users/");
      setUser(data);
    };
    getUsers();
  }, []);
  return (
    <Select.Root>
      <Select.Trigger placeholder="Select a User" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneSelect;

// import prisma from "@/prisma/client";
// import { Select } from "@radix-ui/themes";
// import React from "react";

// const AssigneSelect = async () => {
//   const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
//   console.log(users);
//   return (
//     <Select.Root>
//       <Select.Trigger placeholder="Select a User" />
//       <Select.Content>
//         <Select.Group>
//           <Select.Label>Suggestions</Select.Label>
//           {users.map((user) => (
//             <Select.Item key={user.id} value={user.id}>
//               {user.name}
//             </Select.Item>
//           ))}

//           <Select.Item value="apple">Apple</Select.Item>
//           <Select.Item value="grape" disabled>
//             Grape
//           </Select.Item>
//         </Select.Group>
//       </Select.Content>
//     </Select.Root>
//   );
// };

// export default AssigneSelect;

// The Above block of code will work for Server Componenets
// ( Not sure why but it was working in this component even though it can be said as a client component since client is interacting with trigger)
// I followed the mosh way and made it client and did the logic as it should be done in a client component.
