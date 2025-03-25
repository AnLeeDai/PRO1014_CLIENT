interface IAuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: IAuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <main className="mx-auto w-full">{children}</main>
    </div>
  );
}
