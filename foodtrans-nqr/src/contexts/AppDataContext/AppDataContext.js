import { createContext, createElement, useContext, useEffect, useMemo, useState } from 'react';
import { foodtransApi } from '../../services/api/index.js';
import { initialLogisticsData } from '../../services/logistics/index.js';
import { createId } from '../../utils/ids/index.js';
import { useLocalStorage } from '../../hooks/useLocalStorage/index.js';
import { useUser } from '../UserContext/index.js';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const { user, token } = useUser();
  const [data, setData] = useLocalStorage('foodtrans-nqr-data', initialLogisticsData);
  const [movements, setMovements] = useState([]);
  const [clients, setClients] = useState([]);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    if (!user || !token) {
      setApiStatus('checking');
      setMovements([]);
      return undefined;
    }
    let active = true;

    const load = async () => {
      try {
        const requests = [foodtransApi.getMovements(token)];
        if (user.role === 'admin') requests.push(foodtransApi.getData(token), foodtransApi.getClients(token));
        const [movementData, apiData, clientData] = await Promise.all(requests);
        if (!active) return;
        setMovements(movementData);
        if (apiData) setData(apiData);
        if (clientData) setClients(clientData);
        setApiStatus('connected');
      } catch {
        if (active) setApiStatus('offline');
      }
    };

    load();
    const refreshTimer = window.setInterval(load, 10000);

    return () => {
      active = false;
      window.clearInterval(refreshTimer);
    };
  }, [setData, token, user]);

  const actions = useMemo(
    () => ({
      async addTrip(trip) {
        const newTrip = {
          ...trip,
          id: createId('via'),
          value: Number(trip.value || 0),
        };

        try {
          await foodtransApi.createTrip(newTrip, token);
          setApiStatus('connected');
        } catch {
          setApiStatus('offline');
        }

        setData((current) => ({
          ...current,
          trips: [newTrip, ...current.trips],
        }));
      },
      async updateTripStatus(tripId, status) {
        try {
          await foodtransApi.updateTripStatus(tripId, status, token);
          setApiStatus('connected');
        } catch {
          setApiStatus('offline');
        }

        setData((current) => ({
          ...current,
          trips: current.trips.map((trip) =>
            trip.id === tripId ? { ...trip, status } : trip,
          ),
        }));
      },
      async addDocument(document) {
        const newDocument = {
          ...document,
          id: createId('doc'),
          uploadedAt: new Date().toISOString().slice(0, 10),
          status: document.status || 'Cargado',
        };

        try {
          await foodtransApi.createDocument(newDocument, token);
          setApiStatus('connected');
        } catch {
          setApiStatus('offline');
        }

        setData((current) => ({
          ...current,
          documents: [newDocument, ...current.documents],
        }));
      },
      async updateVehicleStatus(vehicleId, status) {
        try {
          await foodtransApi.updateVehicleStatus(vehicleId, status, token);
          setApiStatus('connected');
        } catch {
          setApiStatus('offline');
        }

        setData((current) => ({
          ...current,
          vehicles: current.vehicles.map((vehicle) =>
            vehicle.id === vehicleId ? { ...vehicle, status } : vehicle,
          ),
        }));
      },
      resetDemoData() {
        setData(initialLogisticsData);
      },
      async addMovement(movement) {
        const created = await foodtransApi.createMovement(movement, token);
        setMovements((current) => [created, ...current]);
        setApiStatus('connected');
        return created;
      },
      async addClient(client) {
        const created = await foodtransApi.createClient(client, token);
        setClients((current) => [created, ...current]);
        setApiStatus('connected');
        return created;
      },
      async updateClient(clientId, client) {
        const updated = await foodtransApi.updateClient(clientId, client, token);
        setClients((current) => current.map((item) => item.id === clientId ? updated : item));
        setApiStatus('connected');
        return updated;
      },
    }),
    [setData, token],
  );

  const value = useMemo(() => ({ data, movements, clients, apiStatus, ...actions }), [data, movements, clients, apiStatus, actions]);

  return createElement(AppDataContext.Provider, { value }, children);
}

export function useAppData() {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error('useAppData debe usarse dentro de AppDataProvider');
  }

  return context;
}
