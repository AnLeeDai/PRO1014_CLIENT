interface IAuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: IAuthLayoutProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <main className="mx-auto">{children}</main>
    </div>
  );
}
