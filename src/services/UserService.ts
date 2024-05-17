// services/userService.ts
import axios from "axios";
import { User, UserResponse } from "../types/userTypes";

const fetchUsers = async (): Promise<User[]> => {
    const url = "https://randomuser.me/api/?results=20";
    const response = await axios.get<UserResponse>(url);
    return response.data.results;
};

export default fetchUsers;
