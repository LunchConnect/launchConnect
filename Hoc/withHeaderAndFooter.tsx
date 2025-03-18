import { Footer } from "./Footer";
import { Header } from "./Header";


const withHeaderAndFooter = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => (
    <div className="flex flex-col min-h-screen max-w-[1600px] mx-auto">
      <Header />
      <main className="flex-1">
        <WrappedComponent {...props} />
      </main>
      <Footer />
    </div>
  );
};

export default withHeaderAndFooter;
