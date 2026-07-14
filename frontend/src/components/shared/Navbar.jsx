import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);

    console.log("Navbar User =", user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4">

                {/* Logo */}
                <h1 className="text-2xl font-bold">
                    Job<span className="text-[#F83002]">Portal</span>
                </h1>

                {/* Right Side */}
                <div className="flex items-center gap-8">

                    <ul className="flex items-center gap-5 font-medium">
                        {user?.role === "recruiter" ? (
                            <>
                                <li>
                                    <Link to="/admin/companies">Companies</Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs">Jobs</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/jobs">Jobs</Link>
                                </li>
                                <li>
                                    <Link to="/browse">Browse</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className="flex gap-2">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>

                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
    <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center cursor-pointer">
        {user?.fullname?.charAt(0).toUpperCase()}
    </div>
</PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div>

                                    <div className="flex gap-3">
                                        <Avatar>
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto || ""}
                                            />
                                        </Avatar>

                                        <div>
                                            <h4 className="font-semibold">
                                                {user?.fullname}
                                            </h4>

                                            <p className="text-sm text-gray-500">
                                                {user?.profile?.bio}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-col gap-2">

                                        {user?.role === "student" && (
                                            <div className="flex items-center gap-2">
                                                <User2 size={18} />
                                                <Link to="/profile">
                                                    <Button variant="link">
                                                        View Profile
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2">
                                            <LogOut size={18} />
                                            <Button
                                                variant="link"
                                                onClick={logoutHandler}
                                            >
                                                Logout
                                            </Button>
                                        </div>

                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;