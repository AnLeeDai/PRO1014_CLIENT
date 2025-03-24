import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      {/* banner */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Welcome to HeroUI
          </h1>
          <p className="text-center text-gray-600 mt-4">
            A React UI library for building modern web applications
          </p>
        </div>
      </div>

      {/* card items */}
      <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800">Easy to use</h2>
          <p className="text-gray-600 mt-4">
            HeroUI is designed to be easy to use and customize. You can start
            building your app in minutes.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800">Modern design</h2>
          <p className="text-gray-600 mt-4">
            HeroUI provides a modern and clean design that helps you build
            beautiful web applications.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800">Fully responsive</h2>
          <p className="text-gray-600 mt-4">
            HeroUI is fully responsive and works well on all devices, from
            mobile to desktop.
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}
