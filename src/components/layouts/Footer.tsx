export default function Footer() {
  return (
    <footer className="footer py-5 text-center border-t-2 bg-white dark:bg-[#1a1a1e] border-t-gray-300 dark:border-t-gray-600">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Games Finder. All rights reserved.
      </p>
    </footer>
  );
}
