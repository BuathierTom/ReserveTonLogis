import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ApiCall from '../ApiCall'; // Assurez-vous d'importer le chemin correct

// Utilisez jest.spyOn pour simuler la fonction fetch
const mockFetch = jest.spyOn(global, 'fetch');

// Mockez la réponse de fetch
const mockResponse = { 
  json: jest.fn().mockResolvedValue({ /* Données de réponse simulées */ }),
};

beforeEach(() => {
  mockFetch.mockResolvedValue(mockResponse);
});

afterEach(() => {
  mockFetch.mockClear();
  mockResponse.json.mockClear();
});

it('devrait appeler fetch avec l\'URL appropriée', async () => {
  // Appelez la fonction ApiCall
  ApiCall();

  // Attendez que fetch soit appelé
  await waitFor(() => expect(mockFetch).toHaveBeenCalledWith("http://localhost:5000/chambres/get/undefined")); // Remplacez "1" par l'ID attendu

  // Attendez que la réponse soit résolue
  await waitFor(() => expect(mockResponse.json).toHaveBeenCalled());
});
