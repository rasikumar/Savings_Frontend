import { UserProvider } from "./UserContext"; // Import your custom contexts

const Providers = ({ children }) => {
  return (
    <UserProvider>
      {/* You can add more providers here */}
      {children}
      {/* </AnotherContextProvider> */}
    </UserProvider>
  );
};

export default Providers;
