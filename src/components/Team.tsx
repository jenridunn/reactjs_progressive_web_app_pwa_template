import { useEffect, useState } from "react"

interface TeamProps {

}

const Team: React.FC<TeamProps> = () => {

    const [data, setData] = useState([])
    const [mode, setMode] = useState<"online" | "offline">("online")

    useEffect(() => {
        const url = "https://jsonplaceholder.typicode.com/users"
        fetch(url).then(res => {
            res.json().then(jsonres => {
                setMode("online")
                setData(jsonres)
                localStorage.setItem("userInfo", JSON.stringify(jsonres))
            })
        }).catch(err => {
            setMode("offline")
            setData(JSON.parse(localStorage.getItem("userInfo")!))
        })
    }, [])

    return (
        <>
            {
                mode === "offline" &&
                <div className=" bg-yellow-50 text-yellow-500 text-center p-5 mb-3">
                    Offline mode activated. Check out if you have connection issues.
                </div>
            }
            <ul role="list" className="divide-y divide-gray-200">
                {
                    data.length > 0 && data.map((user: any) => (
                        <li key={user.id} className="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <div className="flex justify-between space-x-3">
                                <div className="min-w-0 flex-1">
                                    <a href="#" className="block focus:outline-none">
                                        <span className="absolute inset-0" aria-hidden="true"></span>
                                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                    </a>
                                </div>
                                <time className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">1d ago</time>
                            </div>
                            <div className="mt-1">
                                <p className="line-clamp-2 text-sm text-gray-600">
                                    Website: {user.website}
                                </p>
                            </div>
                        </li>
                    ))
                }

            </ul>
        </>
    )
}

export default Team