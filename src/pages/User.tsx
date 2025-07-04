import { AddUserModal } from "@/components/module/users/AddUserModal";
import UserCard from "@/components/module/users/UserCard";
import { selectUsers } from "@/redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

export default function User() {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  return (
    <div className="max-w-7xl mx-auto px-5 mt-20">
      <div className="flex justify-between gap-5">
        <h1 className="mr-auto">Users</h1>

        <AddUserModal />
      </div>
      <div className="space-y-5 mt-5">
        {users.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
}
