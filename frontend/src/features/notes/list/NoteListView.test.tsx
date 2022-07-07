import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { NoteTypes } from 'constants/noteTypes';
import { render, RenderOptions, waitFor } from 'utils/test-utils';

import { INoteListViewProps, NoteListView } from './NoteListView';

describe('Note List View', () => {
  const mockAxios = new MockAdapter(axios);
  const setup = (renderOptions?: RenderOptions & INoteListViewProps) => {
    // render component under test
    const component = render(<NoteListView type={NoteTypes.File} />, {
      ...renderOptions,
    });

    return {
      ...component,
    };
  };

  beforeEach(() => {
    mockAxios.reset();
  });

  it('renders as expected', async () => {
    mockAxios.onGet(new RegExp(`notes/${NoteTypes.File}/*`)).reply(200, {});
    const { asFragment } = setup();
    const fragment = await waitFor(() => asFragment());
    expect(fragment).toMatchSnapshot();
  });
  it('should call the API Endpoint with given type', async () => {
    mockAxios.onGet(new RegExp(`notes/${NoteTypes.File}`)).reply(200, {});
    setup({
      type: NoteTypes.File,
    });
    await waitFor(() => {
      expect(mockAxios.history.get).toHaveLength(1);
      expect(mockAxios.history.get[0].url).toBe(`/notes/${NoteTypes.File}`);
    });
  });
  it('should have the Notes header in the component', async () => {
    mockAxios.onGet(new RegExp(`notes/${NoteTypes.File}`)).reply(200, {});
    setup({ type: NoteTypes.File });
    expect(screen.getByText(`Notes`)).toBeInTheDocument();
  });
});
