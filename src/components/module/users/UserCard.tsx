import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { removeUser } from "@/redux/features/users/userSlice";
import type { IUser } from "@/types/user-types";

interface IUserCardProps {
  user: IUser;
}

export default function UserCard({ user }: IUserCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="border px-5 py-3 rounded-md flex justify-between items-center">
      <h1>{user.name}</h1>
      <Button
        onClick={() => dispatch(removeUser(user.id))}
        variant="link"
        className="p-0 text-red-500"
      >
        <Trash2 />
      </Button>
    </div>
  );
}
