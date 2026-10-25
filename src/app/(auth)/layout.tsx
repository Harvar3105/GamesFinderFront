export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center px-edge-x py-attention-md">
      {children}
    </div>
  );
}
