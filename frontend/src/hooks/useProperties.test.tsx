import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { IPaginateProperties } from 'constants/API';
import find from 'lodash/find';
import * as MOCK from 'mocks/dataMocks';
import { mockParcel, mockParcelDetail, mockProperties } from 'mocks/filterDataMock';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { networkSlice } from 'store/slices/network/networkSlice';
import { downloadFile as mockDownloadFile } from 'utils/download';

import { useProperties } from './useProperties';

jest.mock('utils/download');

const dispatch = jest.fn();
const requestSpy = jest.spyOn(networkSlice.actions, 'logRequest');
const successSpy = jest.spyOn(networkSlice.actions, 'logSuccess');
const errorSpy = jest.spyOn(networkSlice.actions, 'logError');
const mockAxios = new MockAdapter(axios);

beforeEach(() => {
  mockAxios.reset();
  dispatch.mockClear();
  requestSpy.mockClear();
  successSpy.mockClear();
  errorSpy.mockClear();
});
let currentStore: MockStoreEnhanced<any, {}>;
const mockStore = configureMockStore([thunk]);
const getStore = (values?: any) => {
  currentStore = mockStore(values ?? {});
  return currentStore;
};
const getWrapper = (store: any) => ({ children }: any) => (
  <Provider store={store}>{children}</Provider>
);

const setup = (values?: any) => {
  const { result } = renderHook(useProperties, { wrapper: getWrapper(getStore(values)) });
  return result.current;
};

describe('useProperties functions', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  describe('getProperties action creator', () => {
    const url = `/properties/search?`;
    it('Null Params - Request successful, dispatches success with correct response', async () => {
      const mockResponse = { items: mockProperties };
      mockAxios.onGet(url).reply(200, mockResponse);

      const { getProperties } = setup();
      await getProperties(null);

      expect(find(currentStore.getActions(), { type: 'network/logRequest' })).toBeDefined();
      expect(find(currentStore.getActions(), { type: 'network/logError' })).toBeUndefined();
    });

    it('Request failure, dispatches error with correct response', async () => {
      mockAxios.onGet(url).reply(400, MOCK.ERROR);

      const { getProperties } = setup();
      await expect(getProperties(null)).rejects.toThrow();

      expect(find(currentStore.getActions(), { type: 'network/logRequest' })).toBeDefined();
      expect(find(currentStore.getActions(), { type: 'network/logError' })).toBeDefined();
    });
  });

  describe('getProperty action creator', () => {
    const url = `/properties/${mockParcel.id}`;
    const wfsUrl = new RegExp(`ogs-internal/*`);

    it('Request successful, dispatches success with correct response', async () => {
      const mockResponse = { data: mockParcelDetail };
      const mockWfsResponse = { data: MOCK.mockWfsGetPropertyById };
      // mock API calls
      mockAxios.onGet(url).reply(200, mockResponse);
      mockAxios.onGet(wfsUrl).reply(200, mockWfsResponse);

      const { getProperty } = setup();
      const response = await getProperty(1);

      expect(find(currentStore.getActions(), { type: 'network/logRequest' })).toBeDefined();
      expect(find(currentStore.getActions(), { type: 'network/logError' })).toBeUndefined();
      expect(response).toEqual(mockResponse);
    });

    it('Request failure, dispatches error with correct response', async () => {
      mockAxios.onGet(url).reply(400, MOCK.ERROR);

      const { getProperty } = setup();
      await expect(getProperty(1)).rejects.toThrow();

      expect(find(currentStore.getActions(), { type: 'network/logRequest' })).toBeDefined();
      expect(find(currentStore.getActions(), { type: 'network/logError' })).toBeDefined();
    });
  });

  describe('postProperty action creator', () => {
    const url = `/properties`;
    it('Request successful, dispatches success with correct response', async () => {
      const mockResponse = { data: mockParcelDetail };
      mockAxios.onPost(url).reply(200, mockResponse);

      const { createProperty } = setup();
      await createProperty(mockParcel);

      expect(find(currentStore.getActions(), { type: 'network/logRequest' })).toBeDefined();
      expect(find(currentStore.getActions(), { type: 'network/logError' })).toBeUndefined();
    });

    it('Request failure, dispatches error with correct response', async () => {
      mockAxios.onPost(url).reply(400, MOCK.ERROR);

      const { createProperty } = setup();
      await expect(createProperty(mockParcel)).rejects.toThrow();

      expect(find(currentStore.getActions(), { type: 'network/logRequest' })).toBeDefined();
      expect(find(currentStore.getActions(), { type: 'network/logError' })).toBeDefined();
    });
  });

  describe('updateProperty action creator', () => {
    const url = `/properties/${mockParcel.id}`;
    it('Request successful, dispatches success with correct response', async () => {
      const mockResponse = { data: mockParcel };
      mockAxios.onPut(url).reply(200, mockResponse);

      const { updateProperty } = setup();
      const response = await updateProperty(mockParcel);

      expect(find(currentStore.getActions(), { type: 'network/logRequest' })).toBeDefined();
      expect(find(currentStore.getActions(), { type: 'network/logError' })).toBeUndefined();
      expect(response).toEqual(mockResponse);
    });

    it('Request failure, dispatches error with correct response', async () => {
      mockAxios.onPut(url).reply(400, MOCK.ERROR);

      const { updateProperty } = setup();
      await expect(updateProperty(mockParcel)).rejects.toThrow();

      expect(find(currentStore.getActions(), { type: 'network/logRequest' })).toBeDefined();
      expect(find(currentStore.getActions(), { type: 'network/logError' })).toBeDefined();
    });
  });

  describe('deleteParcel action creator', () => {
    const url = `/properties/${mockParcel.id}`;
    it('Request successful, dispatches success with correct response', async () => {
      const mockResponse = { data: { success: true } };
      mockAxios.onDelete(url).reply(200, mockResponse);

      const { deleteProperty } = setup();
      const response = await deleteProperty(mockParcel);

      expect(find(currentStore.getActions(), { type: 'network/logRequest' })).toBeDefined();
      expect(find(currentStore.getActions(), { type: 'network/logError' })).toBeUndefined();
      expect(response).toEqual(mockResponse);
    });

    it('Request failure, dispatches error with correct response', async () => {
      mockAxios.onDelete(url).reply(400, MOCK.ERROR);

      const { deleteProperty } = setup();
      await expect(deleteProperty(mockParcel)).rejects.toThrow();

      expect(find(currentStore.getActions(), { type: 'network/logRequest' })).toBeDefined();
      expect(find(currentStore.getActions(), { type: 'network/logError' })).toBeDefined();
    });
  });

  describe('exportProperties action creator', () => {
    const url = RegExp(`/reports/properties?.*`);
    it('Request successful, dispatches success with correct response', async () => {
      const mockResponse = 'foo bar baz - this would be binary content for a csv file';
      mockAxios.onGet(url).reply(200, mockResponse);
      const filter: IPaginateProperties = { page: 1, quantity: 10 };

      const { exportProperties } = setup();
      await exportProperties(filter);

      expect(find(currentStore.getActions(), { type: 'network/logRequest' })).toBeDefined();
      expect(find(currentStore.getActions(), { type: 'network/logError' })).toBeUndefined();
      expect(mockDownloadFile).toHaveBeenCalledWith(expect.anything(), mockResponse);
    });

    it('Request failure, dispatches error with correct response', async () => {
      mockAxios.onGet(url).reply(500);
      const filter: IPaginateProperties = { page: 1, quantity: 10 };

      const { exportProperties } = setup();
      await expect(exportProperties(filter)).rejects.toThrow();

      expect(find(currentStore.getActions(), { type: 'network/logRequest' })).toBeDefined();
      expect(find(currentStore.getActions(), { type: 'network/logError' })).toBeDefined();
      expect(mockDownloadFile).not.toBeCalled();
    });
  });
});
