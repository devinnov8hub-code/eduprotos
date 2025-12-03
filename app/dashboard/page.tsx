import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Image from "next/image";
import cartoon from "../assets/images/Group 5.png"
type DashboardProps = {
  name: string;
};

export default function Dashboard({ name }: DashboardProps) {
  return (
    <div className="flex w-full ml-1/8  bg-white">
      <Sidebar />
      <section className="flex flex-col w-full ml-10">
        <Header children={<div>Dashboard</div>} />
        <main className="bg-gray-50 h-full p-5 flex">
        <section className="sec-1">
          <div className=" box-1 flex items-center justify-between bg-white rounded">
            <div>
              <h1 className="text-2xl font-bold text-black">Hello {name || "Lecturer"}</h1>
              <p className="text-sm text-gray-500">
                Here are your teaching tools for today
              </p>
            </div>
            <Image src={cartoon} alt="dashboard" />
          </div>
        </section>
        <section className="sec-2 w-2/5">
          <img src="" alt="" />
          <h1 className="text-black p-4">calendar</h1>
        </section>
        </main>
      </section>
    </div>
  );
}
