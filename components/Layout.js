import { Header } from "./Header";
import { Footer } from "./Footer";

//Gives structure to the website by setting a header and footer.
//When layout is used the header will always be at the top of the page and the footer at the bottom
//All other content comes in between them
export const Layout = ({
  navigation,
  settings,
  withSignUpForm,
  children,
}) => {
  return (
    <div className="text-slate-700">
      <Header
        navigation={navigation}
        settings={settings}
      />
      <main>{children}</main>
      <Footer withSignUpForm={withSignUpForm} settings={settings} />
    </div>
  );
};
