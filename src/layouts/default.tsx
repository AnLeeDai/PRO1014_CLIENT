import { Link } from "@heroui/link";
import { Input } from "@heroui/react";

import Header from "@/components/header";
import { SearchIcon } from "@/components/icons";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Header />

      <div className="container mx-auto mt-6">
        <Input
          classNames={{
            base: "max-w-[50%] h-10 mx-auto",
            mainWrapper: "h-full",
            input:
              "h-full flex items-center text-small placeholder:text-center",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Nhập từ khóa tìm kiếm (ví dụ: điện thoại, laptop...)"
          size="md"
          startContent={<SearchIcon size={24} />}
          type="search"
        />
      </div>

      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-6">
        {children}
      </main>

      {/* footer */}
      <footer className="container mx-auto px-6 bg-default-400 dark:bg-default-500 text-default-500 dark:text-default-400 text-center py-4">
        <p className="text-small">
          © 2021 - Bản quyền thuộc về{" "}
          <Link color="primary" href="#">
            ACME
          </Link>
        </p>
      </footer>
    </div>
  );
}
