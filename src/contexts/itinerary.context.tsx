import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

import { api } from "../services/api";

interface ItinerariesContextData {
  uploadFile (file: any): Promise<string>;
  listItineraries (): Promise<void>;
  favoriteItinerary (id: string): Promise<void>;
  rateItinerary ({ id, rate }: { id: string; rate: number; }): Promise<void>;
  itineraries: any;
}

const ItinerariesContext = createContext<ItinerariesContextData>(
  {} as ItinerariesContextData
);

export const ItinerariesProvider = ({ children }: any) => {
  const [itineraries, setItineraries] = useState([]);

  const uploadFile = async (file: any) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post("/itineraries/upload", formData);

    return response.data.locationInS3;
  };

  const listItineraries = async () => {
    const response = await api.get("/itineraries/all");

    setItineraries(response.data);

    return;
  };

  const favoriteItinerary = async (id: string) => {
    try {
      const response = await api.post("/user/favorite/itinerary", {
        itinerary: id,
      });

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (e: any) {
      toast.error(e.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const rateItinerary = async ({ id, rate }: { id: string; rate: number; }) => {
    try {
      const response = await api.post("/itineraries/rate", {
        id: id,
        rate: rate,
      });

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (e: any) {
      toast.error(e.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <ItinerariesContext.Provider
      value={{
        rateItinerary,
        favoriteItinerary,
        uploadFile,
        listItineraries,
        itineraries,
      }}
    >
      {children}
    </ItinerariesContext.Provider>
  );
};

export function useItineraries (): ItinerariesContextData {
  const context = useContext(ItinerariesContext);

  return context;
}
