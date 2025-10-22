import "./globals.css";
import Header from "./components/Headers/Header";
import ReduxProviderWrapper from "./components/ReduxProviderWrapper";

export const metadata = {
  title: "My App",
  description: "Warehouse Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body className="bg-gray-100 text-gray-900">
        <div className="bg-gray-700 min-h-screen font-sans pb-10">
          <ReduxProviderWrapper>
            <Header />
            <main className="p-4">{children}</main>
          </ReduxProviderWrapper>
        </div>
      </body>
    </html>
  );
}
