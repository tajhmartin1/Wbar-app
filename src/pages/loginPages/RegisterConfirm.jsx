import {Link} from "react-router-dom";

export default function RegisterConfirm() {
    return (
        <div className="flex flex-col px-5 items-center justify-center min-h-screen">
            <div>
                <h1 className="text-6xl font-black uppercase">Confirmation email sent.</h1>
                <p className="mt-3 text-xl text-gray-500">Confirm your email to get started
                    DJing!</p>
            </div>
            <div className={"flex gap-4 mt-5 uppercase font-black text-2xl w-full"}>
                <Link to="/"
                      className="hover:underline">Go home</Link>
                <Link to="/login"
                      className="hover:underline">Log in</Link>
            </div>
        </div>
    );
}