import { AuthProvider } from "./auth.context";
import { ItinerariesProvider } from "./itinerary.context";
import { UserProvider } from "./user.context";

const Root = ({ children }: any) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ItinerariesProvider>{children}</ItinerariesProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default Root;
