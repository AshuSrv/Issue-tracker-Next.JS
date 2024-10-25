"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "@/app/components/Skeleton";

const AssigneSelect = () => {
  //   const [users, setUser] = useState<User[]>([]);

  //   useEffect(() => {
  //     const getUsers = async () => {
  //       const { data } = await axios.get<User[]>("/api/users/");
  //       setUser(data);
  //     };
  //     getUsers();
  //   }, []);

  //   Issue with the UseState and UseEffect approach to fetch users and display list
  //  1. No error handling -> ofcouse can add manually
  //  2. No caching system -> Can add that manually as well.
  //  3. No logic for retrying -> can be added manually as well
  //  But doing all this again and again is tiresome, instead let's use tanstack Querry(react Querry) to replace this old useState and useEffect method.

  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 30 * 1000, // 30 seconds
    retry: 2,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Select a User" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
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
