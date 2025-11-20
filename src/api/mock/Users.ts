import type { User } from "../../types";
import placeholderImg from "../../assets/userPfp.jpg";

export const Users: User[] = [
  {
    name: "Daniel Kery",
    username: "danielk",
    passkey: "123456n",
    role: "staff",
    image: placeholderImg,
  },
  {
    name: "Alice Johnson",
    username: "alicej",
    passkey: "987654n",
    role: "admin",
    image: placeholderImg,
  },
  {
    name: "Bob Smith",
    username: "bobsmith",
    passkey: "555555n",
    role: "user",
    image: placeholderImg,
  },
  {
    name: "Eve Thompson",
    username: "evet",
    passkey: "111222n",
    role: "staff",
    image: placeholderImg,
  },
  {
    name: "Charlie Brown",
    username: "charlieb",
    passkey: "333444n",
    role: "admin",
    image: placeholderImg,
  },
];
